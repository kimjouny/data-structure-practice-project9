export const $=(arg)=>{
    return document.querySelectorAll(arg)
}

export const getQueryString=()=> {
    let params = {};
    
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str, key, value) => { params[key] = value; });
    return params;
}