async function getAllUrls(urls) {
    try {
        let data = await Promise.all(
            urls.map(
                url => fetch(url).then(value => value.json())) 
            );

        return (data)

    } catch (error) {
        console.log(error);
        throw (error);
    }
}

let year = 1960;
let urls = [];

for (let i = 0; i < 61; i++){
    urls.push('data/playlist-' + (year + i).toString() + '.json');            
}

let result = getAllUrls(urls);
