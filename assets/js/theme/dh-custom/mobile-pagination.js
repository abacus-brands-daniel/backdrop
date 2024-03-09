import Url from 'url';
import utils from "@bigcommerce/stencil-utils";


class MobilePagination {

    constructor(context) {
        this.$context = context;
        this.$productPerPage;
        this.$totalProducts;
        this.$isBradPage = $("body").hasClass("template-brand") ? true : false;
        this.$isBrandsPage = $("body").hasClass("template-brands") ? true : false;
        this.$isBlogPage = $("body").hasClass("template-blog") ? true : false;
        this.$token = this.$context.stToken;
        this.$toatlpage;
        this.start = '';
        this.allBrands = sessionStorage.getItem("AllBrand") ? JSON.parse(sessionStorage.getItem("AllBrand")) : 0;

        this.showMobilePagination();
        this.listenFacetedSearch();
        this.listenWindowChange();

        if (this.allBrands == 0) {            
            this.allBrands = {}
            this.getAllBrand();
        }


    }

    showMobilePagination() {
        this.$totalProducts = this.getTotalProducts();
        let queryUrl = this.getParamas();

        this.$productPerPage = queryUrl.query.limit ? parseInt(queryUrl.query.limit) : this.$context.ProductsPerPage;
        
        // PAGINATION

        //for category and search page
        if (!this.$isBradPage && !this.$isBlogPage) {
            this.getTotalPages();
        }

        //for brand page
        if (this.$isBradPage) {
            let result = this.getBrandTotal();

            result.then((pcount) => {
                this.$totalProducts = pcount;
                this.getTotalPages();

            }).catch(err => console.log(err));
        }

        
        //fro brands page
        if(this.$isBrandsPage){
            let totalB = Object.keys(this.allBrands);
            if(totalB.length > 0){
                this.$totalProducts = totalB.length;
                this.getTotalPages();
            }
        }

        //for blog page
        if (this.$isBlogPage) {
            let blogs = this.getAllBlogCount();
            blogs.then((b) => {
                this.$totalProducts = Number(b.trim());
                this.getTotalPages();

            }).catch(err => console.log(err));
        }

        this.hideShowPagination();
    }

    listenFacetedSearch() {
        $(window).on('paginationChange', () => {
            this.$totalProducts = this.getTotalProducts();
            this.showMobilePagination();
        });
    }

    listenWindowChange() {
        $(window).on("resize", () => {
            this.hideShowPagination();
        });
    }

    hideShowPagination() {
        if ($(window).width() < 1023) {
            $(".desktop").hide();
            $(".pagination-item-mobile").show();
        } else {
            $(".desktop").show();
            $(".pagination-item-mobile").hide();
        }
    }

    getTotalProducts() {
        return $(`[data-total-product]`).length > 0 ? $(`[data-total-product]`).data("total-product") : 0;
    }


    getTotalPages() {
        if (this.$totalProducts > 0) {
            if ($(".mobile-pages-count").length > 0) {
                let finalPages = Math.ceil(this.$totalProducts / this.$productPerPage);
                $(".mobile-pages-count").html(`${finalPages}`);
            } else {
                console.warn("mobile-pages-count not found");
            }
        }
    }

    getParamas() {
        return Url.parse(window.location.href, true);
    }

    getBrandTotal() {
        return new Promise((resolve, reject) => {
            let brandId = this.allBrands[this.$context.brandUrl];
            let opt = {
                template: "getTotalBrandProd"
            }
            utils.api.getPage(`/categories/?brand=${brandId?.entityId}`, opt, (err, content) => {
                if (err) {
                    reject(err);
                }
                resolve(content);
            });
        })


    }


    getAllBrand() {
        let getOptionsQuery = `
        query ExtendedProductsById {
            site{
              brands(first: 50 ${this.start}){
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  edges{
                    node{                
                        entityId
                        name
                        path
                    }
                  }
              }    
            }
        }`;

        fetch('/graphql', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.$token}`
            },
            body: JSON.stringify({
                query: getOptionsQuery
            })
        }).then(res => res.json()).then(res => {

            let b = res.data?.site?.brands;
            if (!b) {
                return
            }
            b.edges.forEach((el) => this.allBrands[el.node.path] = el.node);
            
            if (b.pageInfo.hasNextPage) {
                this.start = `, after: "${b.pageInfo.endCursor}"`;
                this.getAllBrand(this.start);
            } else {
                sessionStorage.setItem("AllBrand", JSON.stringify(this.allBrands))
            }


        });
    }

    getAllBlogCount() {
        return new Promise((resolve, reject) => {
            let opt = {
                template: "getAllBlog",
                config: {
                    blog: {
                        posts: {
                            limit: 1000
                        }
                    }
                }
            }

            utils.api.getPage(`/blog/`, opt, (err, content) => {
                if (err) {
                    reject(err)
                }
                resolve(content);
            });
        });


    }

}

export default (c) => new MobilePagination(c);
