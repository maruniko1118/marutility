function updateLength(val) {
    document.getElementById('pass-length-val').innerText = val;
}

function generatePassword() {
    const length = parseInt(document.getElementById('pass-length').value);
    const useUpper = document.getElementById('use-upper').checked;
    const useLower = document.getElementById('use-lower').checked;
    const useNumber = document.getElementById('use-number').checked;
    const useSymbol = document.getElementById('use-symbol').checked;
    
    const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsLower = "abcdefghijklmnopqrstuvwxyz";
    const charsNumber = "0123456789";
    const charsSymbol = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let availableChars = "";
    if (useUpper) availableChars += charsUpper;
    if (useLower) availableChars += charsLower;
    if (useNumber) availableChars += charsNumber;
    if (useSymbol) availableChars += charsSymbol;

    if (availableChars === "") {
        alert("少なくとも1つの文字種を選択してください");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    document.getElementById('pass-result').value = password;
}

function copyPassword() {
    const passInput = document.getElementById('pass-result');
    if (!passInput.value) return;
    
    passInput.select();
    document.execCommand('copy'); // モダンブラウザなら navigator.clipboard.writeText も可
    
    // コピー完了のエフェクト（ボタンの色を一瞬変えるなど）
    const btn = document.querySelector('.icon-btn-copy');
    const originalColor = btn.style.color;
    btn.style.color = 'var(--accent-red)';
    setTimeout(() => {
        btn.style.color = originalColor;
    }, 500);
}

// 初回ロード時に1回生成しておく
generatePassword();