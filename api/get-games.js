// api/get-games.js
export default async function handler(req, res) {
    const url = "https://mostplayvip.com/api/bt/v1/message/getFeaturedGames?isLogin=false&currencyTypeId=17&languageTypeId=1&platformTypes=2";

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://mostplayvip.com/',
                'Origin': 'https://mostplayvip.com'
            }
        });

        const data = await response.json();
        
        // CORS Headers allow karne ke liye
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
}
