
export const queryPrisma = (page: number | undefined, pageSize: number | undefined) => {

    const pageDefault = 1;
    const pageSizeDefault = 2;
    
    const pagePagi = page ?? pageDefault
    const pageSizePagi = pageSize ?? pageSizeDefault

    const index = (pagePagi - 1) * pageSizePagi
    console.log("query", { pagePagi, pageSizePagi, index })

    return {
        pagePagi,
        pageSizePagi,
        index
    }
}