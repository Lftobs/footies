


export const getAllProducts = async () => {
    let url =`/api/products?organization_id=${import.meta.env.VITE_ORGID}&reverse_sort=false&page=1&size=10&Appid=${import.meta.env.VITE_Appid}&Apikey=${import.meta.env.VITE_APIKEY}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    let url =`/api/products/${id}?organization_id=${import.meta.env.VITE_ORGID}&reverse_sort=false&page=1&size=10&Appid=${import.meta.env.VITE_Appid}&Apikey=${import.meta.env.VITE_APIKEY}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data['items']
    } catch (error) {
        console.log(error);
    }
}

