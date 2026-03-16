export default async function handler(req, res) {
    const url = "https://mostplayvip.com/api/bt/v1/message/getFeaturedGames?isLogin=false&currencyTypeId=17&languageTypeId=1&platformTypes=2";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // Yeh headers Cloudflare ko bypass karne mein madad karte hain
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://mostplayvip.com/',
                'Origin': 'https://mostplayvip.com',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
            }
        });

        // Check karein ke response JSON hai ya HTML
        const contentType = response.headers.get("content-type");
        
        if (response.ok && contentType && contentType.includes("application/json")) {
            const data = await response.json();
            res.setHeader('Access-Control-Allow-Origin', '*');
            return res.status(200).json(data);
        } else {
            // Agar HTML bhej raha hai (Cloudflare block)
            const errorText = await response.text();
            console.error("Cloudflare Blocked Request. Response starts with:", errorText.substring(0, 100));
            return res.status(403).json({ 
                error: "Cloudflare Blocked", 
                message: "Site is protecting the API. Try again in a few minutes or use a different IP." 
            });
        }

    } catch (error) {
        return res.status(500).json({ error: "Server Error", details: error.message });
    }
}
