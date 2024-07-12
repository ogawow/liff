<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LIFF + Claude Flex Message Creator</title>
    <script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f0f0f0;
        }
        h1 {
            color: #00b900;
            text-align: center;
            margin-bottom: 30px;
        }
        #userInput {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        button {
            background-color: #00b900;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #009900;
        }
        #shareButton {
            background-color: #4a4a4a;
            margin-left: 10px;
        }
        #shareButton:hover {
            background-color: #333;
        }
        .button-container {
            text-align: center;
        }
        #result {
            margin-top: 20px;
            padding: 15px;
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <h1>Flex Message Creator</h1>
    <textarea id="userInput" rows="4" placeholder="メッセージを入力してください"></textarea>
    <div class="button-container">
        <button onclick="generateFlexMessage()">Flexメッセージを生成</button>
        <button id="shareButton" onclick="shareMessage()" style="display:none;">メッセージを共有</button>
    </div>
    <div id="result"></div>

    <script>
        let generatedFlexMessage;

        async function initializeLiff() {
            await liff.init({ liffId: "YOUR_LIFF_ID" });
            if (!liff.isLoggedIn()) {
                liff.login();
            }
        }

        async function generateFlexMessage() {
            const userInput = document.getElementById('userInput').value;
            
            generatedFlexMessage = {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": userInput,
                            "wrap": true
                        }
                    ]
                }
            };
            
            document.getElementById('shareButton').style.display = 'inline-block';
            document.getElementById('result').innerHTML = `
                <h3>生成されたFlexメッセージ:</h3>
                <pre>${JSON.stringify(generatedFlexMessage, null, 2)}</pre>
            `;
        }

        async function shareMessage() {
            if (!liff.isApiAvailable('shareTargetPicker')) {
                alert("ShareTargetPicker is not available");
                return;
            }

            try {
                const result = await liff.shareTargetPicker([
                    {
                        type: "flex",
                        altText: "Flex Message",
                        contents: generatedFlexMessage
                    }
                ]);
                if (result) {
                    alert("メッセージが正常に共有されました！");
                } else {
                    alert("共有前にShareTargetPickerが閉じられました。");
                }
            } catch (error) {
                console.error('メッセージ共有エラー:', error);
                alert("メッセージの共有中にエラーが発生しました。");
            }
        }

        window.onload = initializeLiff;
    </script>
</body>
</html>