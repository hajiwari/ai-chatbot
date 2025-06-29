var newChat = document.getElementById("newChat");
var chatContainer = document.getElementById("chatContainerNewChat");
var userAIGlobalContainer = document.getElementById("userAIGlobalContainer");
var sendButtonContainer = document.getElementById("sendButtonContainer");
var messageInput = document.querySelector(".message-input");
var userChatSecondaryContainer = document.getElementById("userChatSecondaryContainer");
var popuplogOutText = document.getElementById("popuplogOutText");
var iconFile = document.getElementById("iconFile");
var docuFile = document.querySelector(".upload.docu-file");
var iconImg = document.getElementById("iconImg");
var docuImg = document.querySelector(".upload.img-file");
var dashboardUpdateButton = document.getElementById("dashboardUpdateButton");
var iconMenu = document.getElementById("iconMenu");
var bodyContainer = document.getElementById("menuContainer");
var recentChatArea = document.getElementById("recentChatArea");
var buttonContainer = document.getElementById("buttonContainer");
var popup = document.getElementById("dashboardComponentContainer");
var modifyShorter = document.getElementById("modifyShorter");
var modifyLonger = document.getElementById("modifyLonger");
var modifySimpler = document.getElementById("modifySimpler");
var modifyMoreCasual = document.getElementById("modifyCasual");
var modifyProfessional = document.getElementById("modifyProfessional");
var micIcon = document.getElementById('micIcon');
var messageInput = document.getElementById('messageInput');
var recentPin = document.getElementById('recentPin');
var recentRename = document.getElementById('recentRename');
var recentArchive = document.getElementById('recentArchive');
var recentDelete = document.getElementById('recentDelete');
var toggleButton = document.getElementById("lightDarkToggle");
var mainChat = document.getElementById("mainChat");
var headerContainer = document.getElementById("headerContainer");
var footerContainer = document.getElementById("footerContainer");
var suggestionElements = document.querySelectorAll(".suggestions-content");
var filePreviews = document.getElementById('filePreviews');
var isUserMessage = true;
var fileURL;
var defaultImage = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700843227/assets/agjh6za9dbl6ybfnvjj8.svg";


function openFileInput() {
    document.getElementById('hiddenFileInput').click();
}

document.addEventListener("DOMContentLoaded", function () {
    let timeoutId;
    const timeoutDuration = 5 * 60 * 1000;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (user.emailVerified) {
                console.log("Verified");
            } else {
                firebase.auth().signOut();
                window.location.href = "./login";
            }
            const userId = user.uid;
            const userRef = database.ref("users/" + userId);
            userRef.on('value', snapshot => {
                const userData = snapshot.val();
                const imageData = userData.imageDataURL || '';
                if (imageData !== '') {
                    userImage.src = imageData;
                    profileChatPage.src = imageData;
                } else {
                    userImage.src = defaultImage;
                    profileChatPage.src = defaultImage;
                }
            });

            console.log("User ID:", userId);
            firebase
                .database()
                .ref("users/" + userId)
                .once("value")
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) {
                        console.error("User data is null or undefined");
                        return;
                    }
                    if (
                        "Username" in userData &&
                        "Email" in userData &&
                        "First_Name" in userData &&
                        "Middle_Name" in userData &&
                        "Last_Name" in userData
                    ) {
                        let username = userData.Username;
                        let dashCleanedUsername = username.split("@")[0];
                        let dashFullName = `${userData.First_Name} ${userData.Middle_Name} ${userData.Last_Name}`;
                        let dashEmail = `${userData.Email}`;

                        document.getElementById("chatUsername").innerHTML = dashCleanedUsername;
                        document.getElementById("dashUsername").innerHTML = dashCleanedUsername;
                        document.getElementById("dashFullName").textContent = dashFullName;
                        document.getElementById("dashEmail").innerHTML = dashEmail;
                    } else {
                        console.error("Required properties are missing in user data");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                });
        } else {
            window.location.href = "./login";
        }
    });
    // TIME OUT
    function resetTimeout() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            window.location.href = "./login";
        }, timeoutDuration);
    }
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);
    document.addEventListener("click", resetTimeout);
});

// FUNCTION FOR UPLOADING IMAGE TO FIREBASE
function handleChange(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            userImage.src = e.target.result;
            profileChatPage.src = e.target.result;
            updateImageData(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// FUNCTION FOR UPLOADING IMAGE TO FIREBASE
function updateImageData(imageDataURL) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const imageDataRef = database.ref("users/" + userId);

        imageDataRef
            .update({
                imageDataURL: imageDataURL
            })
            .then(() => {
                console.log("Image data updated in the database");
            })
            .catch((error) => {
                console.error("Error updating image data:", error);
            });
    }
}

// DASHBOARD COMPONENT CONTAINER POPUP
function dashboardPopUp() {
    if (!buttonContainer) return;
    buttonContainer.addEventListener("click", function () {

        if (!popup) return;
        popup.removeAttribute("style");
        popup.setAttribute("closable", "");

        if (messageInput) {
            messageInput.disabled = true;
            messageInput.style.fontStyle = "italic";
        }

        var onClick =
            popup.onClick ||
            function (event) {
                if (event.target === popup && popup.hasAttribute("closable")) {
                    popup.style.display = "none";
                    if (messageInput) {
                        messageInput.disabled = false;
                        messageInput.style.fontStyle = "normal";
                    }
                }
            };
        popup.addEventListener("click", onClick);

        function addClickListenerToButton(buttonId, displayValue) {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener("click", function () {
                    window.location.href = `./menu_page?display=${displayValue}`;
                });
            }
        }

        addClickListenerToButton("dashboardProfileButton", "profile");
        addClickListenerToButton("dashboardUploadedFilesButton", "uploaded-files");
        addClickListenerToButton("dashboardSettingsButton", "settings");
        addClickListenerToButton("dashboardUpdatesButton", "updates");
        addClickListenerToButton("dashboardAboutButton", "about");
        addClickListenerToButton("dashboardHelpButton", "help");

        const popuplogOutText = document.getElementById("popuplogOutText");
        if (popuplogOutText) {
            popuplogOutText.addEventListener("click", function () {
                firebase.auth().signOut();
                window.location.href = "./login";
            });
        }
    });
}
dashboardPopUp();

// FUNCTION FOR FILE PREVIEW
function displayPreview(file) {
    var filePreviews = document.getElementById("filePreviews");
    var existingPreview = filePreviews.querySelector('.image-previews, .file-previews');
    var previewContainer;

    var dashboardComponent = document.getElementById("dashboardComponentContainer");
    var isDashboardOpen = dashboardComponent.style.display !== 'none';

    if (existingPreview && !isDashboardOpen) {
        filePreviews.removeChild(existingPreview);
    }

    if (!isDashboardOpen) {
        if (file.type.startsWith('image/')) {
            previewContainer = createImagePreview(file);
        } else {
            previewContainer = createFilePreview(file);
        }
        filePreviews.appendChild(previewContainer);
    }
}

var file;
var fileURL = null;

// EVENT LISTENER FOR FILE INPUT 
document.querySelectorAll('input[type="file"]').forEach(function (fileInput) {
    fileInput.addEventListener("change", function (event) {
        file = event.target.files[0];
        displayPreview(file);
        uploadFile();
    });
});

// FUNCTION FOR UPLOADING FILE TO FIREBASE
function uploadFile(callback) {
    var fileName = file.name;
    let storageRef = firebase.storage().ref("files/" + fileName);
    let uploadTask = storageRef.put(file);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
    }, (error) => {
        console.log(error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("URL", url);
            fileURL = url;
            if (typeof callback === 'function') {
                callback();
            }
        })
    })
}
// FUNCTION FOR IMAGE PREVIEW
function createImagePreview(file) {
    var imagePreviewContainer = document.createElement("div");
    var imagePreviewImage = document.createElement("img");
    var closeButton = document.createElement("button");
    imagePreviewContainer.className = "image-previews";
    closeButton.className = "close-button";
    imagePreviewImage.src = URL.createObjectURL(file);
    imagePreviewImage.style.height = "80px";
    imagePreviewImage.style.display = "flex";
    imagePreviewImage.style.borderRadius = "6px";
    closeButton.textContent = "x";
    closeButton.addEventListener("click", function () {
        imagePreviewContainer.remove();
    });

    imagePreviewContainer.appendChild(imagePreviewImage);
    imagePreviewContainer.appendChild(closeButton);

    imagePreviewImage.addEventListener("click", function () {
        openImageInModal(file);
    });

    return imagePreviewContainer;
}

// FUNCTION FOR FILE PREVIEW
function createFilePreview(file) {
    var filePreviewContainer = document.createElement("div");
    var fileIcon = document.createElement("i");
    var filePreviewName = document.createElement("span");
    var closeButton = document.createElement("button");
    var fileTypeIcon = getFileTypeIcon(file.name);
    var space = document.createTextNode('\u00A0\u00A0');

    filePreviewContainer.className = "file-previews";
    fileIcon.className = fileTypeIcon + " fa-fw";
    closeButton.className = "close-button";
    closeButton.textContent = "x";
    filePreviewName.textContent = truncateFileName(file.name);
    filePreviewName.style.fontSize = "15px";

    filePreviewContainer.appendChild(fileIcon);
    filePreviewContainer.appendChild(space);
    filePreviewContainer.appendChild(filePreviewName);
    filePreviewContainer.appendChild(closeButton);

    closeButton.addEventListener("click", function () {
        filePreviewContainer.remove();
    });
    filePreviewContainer.addEventListener("click", function (event) {
        if (!event.target.classList.contains('close-button')) {
            openFileInModal(file);
        }
    });

    return filePreviewContainer;
}

// FUNCTION FOR TRUNCATING FILE NAME
function truncateFileName(fileName) {
    const maxLength = 7;
    if (fileName.length <= maxLength) {
        return fileName;
    } else {
        return fileName.substring(0, maxLength) + "..." + fileName.substring(fileName.length - 14);
    }
}

// FUNCTION FOR FILE TYPE ICON
function getFileTypeIcon(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const iconMappings = {
        'pdf': 'far fa-file-pdf',
        'doc': 'far fa-file-word',
        'docx': 'far fa-file-word',
        'xls': 'far fa-file-excel',
        'xlsx': 'far fa-file-excel',
        'txt': 'far fa-file-alt',
        'jpg': 'far fa-file-image',
        'png': 'far fa-file-image',
        'zip': 'far fa-file-archive',
        'mp3': 'far fa-file-audio',
        'mp4': 'far fa-file-video',
        '': 'far fa-file'
    };
    return iconMappings[fileExtension] || 'far fa-file';
}

// FUNCTION FOR IMAGE MODAL
function openImageInModal(image) {
    var modal = document.createElement("div");
    var modalContent = document.createElement("img");
    modal.className = "modal";
    modalContent.className = "modal-content";
    modalContent.src = URL.createObjectURL(image);

    modalContent.addEventListener("click", function () {
        modal.remove();
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// FUNCTION FOR FILE MODAL
function openFileInModal(fileURL) {
    var newTab = window.open(fileURL, '_blank');
    newTab.focus();
    console.log("Opened URL: ", fileURL);
}
/*
function saveLogsToFile(logs) {
    // Try to retrieve existing logs
    var existingLogs = localStorage.getItem('chatLogs') || '';

    // Append new logs to existing logs
    var updatedLogs = `${existingLogs}\n${logs}`;

    // Save the updated logs to local storage
    localStorage.setItem('chatLogs', updatedLogs);

    // Create a Blob and download link for the updated logs
    var blob = new Blob([updatedLogs], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_logs.txt';

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}*/

// FUNCTION FOR FILE POPUP
function setupPopup(popupTriggerId, popupId, fileInputSelector) {
    const popupTrigger = document.getElementById(popupTriggerId);
    const popup = document.getElementById(popupId);
    const fileInput = popup.querySelector(fileInputSelector);
    const closeButton = popup.querySelector('.close-button-upload');

    if (!popupTrigger || !popup || !fileInput) return;

    let isOpen = false;

    const togglePopup = () => {
        isOpen = !isOpen;
        popup.style.display = isOpen ? "flex" : "none";
    };

    const closePopup = () => isOpen && togglePopup();
    const openFileManager = () => isOpen && fileInput.click();
    const fileManagerChangeHandler = closePopup;
    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            displayPreview(files[0]);
        }
        closePopup();
    };

    const handleDocumentClick = (e) => {
        isOpen && !popup.contains(e.target) && e.target !== popupTrigger && closePopup();
    };

    popupTrigger.addEventListener("click", togglePopup);
    document.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    document.addEventListener("drop", handleFileDrop);
    document.addEventListener("click", handleDocumentClick);

    if (popup.hasAttribute("closable")) {
        popup.addEventListener("click", closePopup);
    }

    if (docuImgPopupContents && docuImgPopup) {
        docuImgPopupContents.addEventListener("click", (e) => {
            e.stopPropagation();
            openFileManager();
        });
        docuImgPopup.addEventListener("click", (e) => {
            if (e.target === docuImgPopup) {
                closePopup();
            }
        });
    }
    if (docuFilePopupContents && docuFilePopup) {
        docuFilePopupContents.addEventListener("click", (e) => {
            e.stopPropagation();
            openFileManager();
        });

        docuFilePopup.addEventListener("click", (e) => {
            if (e.target === docuFilePopup) {
                closePopup();
            }
        });
    }
    closeButton && closeButton.addEventListener('click', closePopup);
    fileInput.addEventListener("click", (e) => e.stopPropagation());
    fileInput.addEventListener("change", fileManagerChangeHandler);
}

setupPopup("iconFile", "docuFilePopup", 'input[type="file"]');
setupPopup("iconImg", "docuImgPopup", 'input[type="file"]');

// FUNCTION FOR SPEECH SYNTHESIS
function speakText(text, volumeSliderValue) {
    const selectedVoice = localStorage.getItem('lang') || 'UK English Female';
    const rate = parseFloat(localStorage.getItem('rate')) || 1.0;
    const pitch = parseFloat(localStorage.getItem('pitch')) || 1.0;

    const settings = {
        rate: rate,
        pitch: pitch,
        volume: (volumeSliderValue !== undefined) ? volumeSliderValue : parseFloat(localStorage.getItem('volume')) / 100,
        volume: parseFloat(document.querySelector(".slider").value) / 100,
        onstart: function () {
            console.log("Voice started");
        },
        onend: function () {
            console.log("Voice ended");
        }
    };

    responsiveVoice.speak(text, selectedVoice, settings);
}

document.querySelector('.slider').addEventListener('input', function () {
    const volumeValue = this.value;
    document.getElementById('volume-value').textContent = volumeValue;
});


// EVENT LISTENER FOR SEND BUTTON AND ENTER KEY
if (messageInput && sendButtonContainer) {
    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    sendButtonContainer.addEventListener("click", sendMessage);
}

let aiMessageCounter = 0;
let isDisplayPreviewPresent = typeof displayPreview === 'function';

// SEND MESSAGE FUNCTION
function sendMessage() {
    var userInput = document.getElementById('messageInput').value;
    var fullName = document.getElementById('dashFullName').textContent;
    var loadingElement = document.getElementById('loading');
    var reloadButton = document.getElementById('reloadPage');
    var fileInput = document.getElementById('fileInput');
    var userMessageContainer = document.createElement("div");
    var userMessageDiv = document.createElement("div");
    var userChatHeadImage = document.createElement("img");
    var aiMessagebuttons = document.createElement("div");
    var aiMessageLeftbtn = document.createElement("div");
    var aiMessageCopy = document.createElement("img");
    var userInput = messageInput.value;

    var file;

    // CONDITION FOR FILE UPLOAD METHOD CALLBACK
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (isDisplayPreviewPresent) {
            if (typeof uploadFile === 'function') {
                uploadFile(file);
                fileInput.value = '';
            }
        }
    }

    if (userInput.trim() !== "") {
        loadingElement.style.display = 'block';
        const fileURLMessage = fileURL ? `\nFile URL: ${fileURL}` : '';
        const userMessage = userInput + fileURLMessage;
        var userInput = $('#messageInput').val();
        var userName = $('#dashFullName').val();

        function sendData() {
            fetch('/process_input', {
                method: 'POST',
                body: JSON.stringify({ userInput: userMessage, fullName: fullName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    loadingElement.style.display = 'none';
                    console.log(userInput);
                    console.log(fullName);
                    console.log(fileURL);
                    console.log(data.response);
                    var currentDate = new Date();
                    var formattedDate = currentDate.toISOString(); // You can format the date as needed

                    // Log user input
                    var userLog = `${formattedDate}: User: ${userInput}`;
                    console.log(userLog);

                    // Log AI response
                    var aiResponseLog = `${formattedDate}: Artifici: ${data.response}`;
                    console.log(aiResponseLog);
                    //saveLogsToFile(`${userLog}\n${aiResponseLog}`);
                    appendMessageToChat(userInput, data.response);
                })
                .catch(data => {
                    console.error('data:', data);
                    loadingElement.style.display = 'none';
                    reloadButton.style.display = 'block';
                })
                .finally(() => {
                    // Set fileURL to an empty string after the function runs
                    fileURL = '';
                });
        }

        if (file) {
            uploadFile(sendData);
        } else {
            file = null;
            sendData();
        }
    }

    if (userInput.trim() !== "") {
        chatContainer.style.display = "none";
        userAIGlobalContainer.style.display = "block";
        userMessageContainer.className = "user-chat-container";
        userMessageDiv.className = "user-chat-secondary-container";
        userMessageDiv.textContent = userInput;
        userChatHeadImage.className = "user-chathead-image";
        userChatHeadImage.id = "userChatHeadImage";
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userId = user.uid;
                const userRef = database.ref("users/" + userId);
                userRef.on('value', snapshot => {
                    const userData = snapshot.val();
                    const imageData = userData.imageDataURL || '';
                    if (imageData !== '') {
                        userChatHeadImage.src = imageData;
                    } else {
                        userChatHeadImage.src = defaultImage;
                    }
                });
            } else {
                userChatHeadImage.src = defaultImage;
            }
        });
        userMessageContainer.appendChild(userMessageDiv);
        userMessageContainer.appendChild(userChatHeadImage);
        userAIGlobalContainer.appendChild(userMessageContainer);

        const filePreviews = document.querySelector("#filePreviews").querySelectorAll(".image-previews, .file-previews");

        for (const preview of filePreviews) {
            const clonedPreview = preview.cloneNode(true);
            const previewImage = clonedPreview.querySelector("img");
            const previewFile = clonedPreview.querySelector("span");
            const closeButton = clonedPreview.querySelector(".close-button");
            const fileTypeIcon = clonedPreview.querySelector("i");


            if (preview.classList.contains("image-previews")) {
                if (closeButton) {
                    closeButton.remove();
                }
                previewImage.style.width = "200px";
                clonedPreview.addEventListener("click", async () => {
                    const imageSrc = previewImage.getAttribute("src");
                    try {
                        const response = await fetch(imageSrc);
                        const blob = await response.blob();
                        openImageInModal(blob);
                    } catch (error) {
                        console.error(error);
                    }
                });
            } else {
                if (closeButton) {
                    closeButton.remove();
                }
                previewFile.style.fontSize = "15px";
                previewFile.style.margin = "13px 27px 0px -6px";
                previewFile.style.borderRadius = "100%";
                previewFile.style.padding = "0 0 0";
                fileTypeIcon.style.fontSize = "25px";
                fileTypeIcon.style.margin = "10px";
                clonedPreview.addEventListener("click", async () => {
                    const fileName = previewFile.textContent;
                    getFileTypeIcon(fileName);
                    if (fileURL) {
                        openFileInModal(fileURL);
                    } else {
                        console.error("File URL not found");
                    }
                });
            }
            userMessageDiv.appendChild(clonedPreview);
        }

        isUserMessage = !isUserMessage;
        document.getElementById("filePreviews").innerHTML = "";
        document.getElementById('messageInput').value = "";
        document.getElementById('messageInput').disabled = true;
        messageInput.value = "";
        scrollToBottom();
    }

    // FUNCTION FOR FORMATTING TEXT WITH MARKDOWN
    function formatTextWithMarkdown(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>\n');
        text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
        text = text.replace(/_(.*?)_/g, '<u>$1</u>');
        text = text.replace(/^\* (.*)(\n\* .*)*$/gm, function (match) {
            const items = match.split('\n');
            const listItems = items.map(item => `<li>${item.substring(2)}</li>`).join('');
            return `<ul>\n${listItems}</ul>\n`;
        });
        text = text.replace(/^\d+\. (.*)(\n\d+\. .*)*$/gm, function (match) {
            const items = match.split('\n');
            const listItems = items.map(item => `<li>${item.substring(item.indexOf('.') + 2)}</li>`).join('');
            return `<ol>\n${listItems}</ol>\n`;
        });
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        text = text.replace(/```(.*?)\n([\s\S]+?)\n```/g,
            '<code-block><div><div><span>$1</span></div><pre><code>$2</code></pre></div></code-block>');

        return text;
    }

    // FUNCTION FOR CREATING POPUP PREVIEW FROM CHAT COMPONENT
    function appendMessageToChat(userInput, response) {
        var aiMessageContainer = document.createElement("div");
        var aiChatHeadContainer = document.createElement("div");
        var aiChatHeadImage = document.createElement("img");
        var aiMessageDiv = document.createElement("div");

        aiMessageContainer.className = "main-ai-chat-container";
        aiChatHeadImage.id = "mainAiChatContainer";
        aiChatHeadContainer.className = "ai-chathead-container";
        aiChatHeadImage.className = "ai-chathead-container artifici-icon";
        aiMessageDiv.className = "ai-chat-container";
        aiMessagebuttons.className = "bottom-buttons";
        aiMessageLeftbtn.className = "chat-button-area";
        aiMessageCopy.className = "icon-content-copy";

        aiChatHeadImage.alt = "Artifici";

        aiChatHeadImage.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316243/assets/iwmruuoefel8srax732a.png";
        aiMessageCopy.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316240/assets/fencirmc6ors1dw3uasj.svg";

        // aiMessageDiv.id = "aiMessageDiv";
        aiMessageDiv.id = "aiMessageDiv" + aiMessageCounter;

        var allAiMessageButtons = document.querySelectorAll('.bottom-buttons');

        allAiMessageButtons.forEach(buttons => {
            buttons.style.display = 'none';
        });

        const aiMessageDivs = document.querySelectorAll('.ai-chat-container');

        aiMessageDivs.forEach(div => {
            let buttonsVisible = false;
            div.addEventListener('mouseenter', function () {
                const buttons = this.querySelector('.bottom-buttons');
                if (buttons && !buttonsVisible) {
                    buttons.style.display = 'flex';
                    buttons.style.opacity = 1;
                    buttons.style.position = 'absolute';
                    buttons.style.top = '-24px';
                    buttons.style.right = '20px';
                    buttons.style.gap = '10px';
                }
            });

            div.addEventListener('mouseleave', function () {
                const buttons = this.querySelector('.bottom-buttons');
                if (buttons && !buttonsVisible) {
                    buttons.style.display = 'none';
                    buttons.style.opacity = 0;
                }
            });

            div.addEventListener('click', function () {
                const buttons = this.querySelector('.bottom-buttons');
                if (buttons) {
                    if (!buttonsVisible) {
                        buttons.style.display = 'flex';
                    }
                }
            });
        });
        aiMessagebuttons.style.display = 'flex';

        if (response.startsWith("https://oaidalleapiprodscus.")) {
            const [imageUrl, text] = response.split(" || ");

            aiMessageDiv.innerHTML = formatTextWithMarkdown(text);

            var imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.style.width = "400px";
            imgElement.style.borderRadius = "16px";
            imgElement.className = "response-image";
            aiMessageDiv.appendChild(imgElement);

        } else if (response.endsWith(".jpg") || response.endsWith(".png") || response.endsWith(".jpeg")) {
            var imgElement = document.createElement("img");
            imgElement.src = response;
            imgElement.className = "response-image";
            imgElement.style.width = "400px";
            aiMessageDiv.appendChild(imgElement);
        }
        else {
            response = formatTextWithMarkdown(response);
            aiMessageDiv.innerHTML = response;
        }
        scrollToBottom();

        aiChatHeadContainer.appendChild(aiChatHeadImage);
        aiMessageContainer.appendChild(aiChatHeadContainer);

        aiMessageCopy.addEventListener('click', function () {
            snackBarFunction(aiMessageDiv.id);
        });

        // MODIFY BUTTON
        function createAiMessageModify() {
            var aiMessageModify = document.createElement("img");
            aiMessageModify.className = "icon-content-modify";
            aiMessageModify.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316240/assets/loczvxyc8kdgbsozolog.svg";

            //userMessageDiv.appendChild(aiMessageModify);
            createPopup('modifyChatComponent', aiMessageModify);

            //return aiMessageModify;
        }
        var aiMessageModify = createAiMessageModify();

        // SPEAK BUTTON CONTAINER
        var aiMessageSpeak = document.createElement("div");
        aiMessageSpeak.className = "speak-button";
        aiMessageSpeak.id = "aiContentSpeak";
        aiMessageDiv.id = "aiMessageDiv" + aiMessageCounter;

        // VOLUME SLIDER
        function createAiVolumeSlider(aiMessageDivId) {
            var aiMessageSpeakIcon = document.createElement("img");
            aiMessageSpeakIcon.className = "icon-content-speak";
            aiMessageSpeakIcon.id = "aiContentSpeakIcon";
            aiMessageSpeakIcon.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316240/assets/trsffe6vviwgbnr9peel.svg";

            aiMessageSpeak.appendChild(aiMessageSpeakIcon);
            createPopup('volumeSlider', aiMessageSpeakIcon);

            let previousSliderValue = null;
            let speechInstance = null;

            if (volumeSlider) {
                let sliderChanged = false;

                volumeSlider.addEventListener('input', function (event) {
                    const currentSliderValue = event.target.value;
                    if (currentSliderValue !== previousSliderValue) {
                        sliderChanged = true;
                        previousSliderValue = currentSliderValue;
                    }
                });

                if (volumeSlider._mouseupEvent) {
                    volumeSlider.removeEventListener('mouseup', volumeSlider._mouseupEvent);
                }

                volumeSlider._mouseupEvent = function (event) {
                    var aiText = document.getElementById(aiMessageDivId).textContent.trim();

                    if (sliderChanged) {
                        if (speechInstance) {
                            speechInstance.cancel();
                        }
                        speechInstance = speakText(aiText, previousSliderValue);
                        sliderChanged = false;
                    }
                };

                volumeSlider.addEventListener('mouseup', volumeSlider._mouseupEvent);
            }

            var speakPlay = document.getElementById('speakPlay');
            speakPlay.addEventListener('click', function () {
                var aiText = document.getElementById(aiMessageDivId).textContent.trim();
                if (speechInstance) {
                    speechInstance.cancel();
                }
                speechInstance = speakText(aiText, parseFloat(volumeSlider.value) / 100);
            });

            var speakStop = document.getElementById('speakStop');
            speakStop.addEventListener('click', function () {
                responsiveVoice.cancel();
            });

            aiMessageCounter++;
            return aiMessageSpeak;
        }
        var aiMessageSpeak = createAiVolumeSlider(aiMessageDiv.id);

        aiMessagebuttons.appendChild(aiMessageLeftbtn);
        aiMessagebuttons.appendChild(aiMessageSpeak);
        aiMessageLeftbtn.appendChild(aiMessageCopy);
        //aiMessageLeftbtn.appendChild(aiMessageModify);
        aiMessageDiv.appendChild(aiMessagebuttons);
        aiMessageContainer.appendChild(aiMessageDiv);
        userAIGlobalContainer.appendChild(aiMessageContainer);

        document.getElementById('messageInput').disabled = false;

        scrollToBottom();
    }
}

// FUNCTION FOR RELOAD PAGE
function reloadPageFunction() {
    location.reload();
}
document.addEventListener('DOMContentLoaded', function () {
    var reloadButton = document.getElementById('reloadPage');
    if (reloadButton) {
        reloadButton.addEventListener('click', reloadPageFunction);
    }
});

// FUNCTION FOR POPUPS
function createPopup(elementId, triggerElement) {
    const popupOverlay = document.getElementById(elementId);
    const componentHandler = document.querySelector(
        '.modify-chat-component',
        '.recent-chat-options-container',
        '.volume-slider-popup');

    function openPopup(e) {
        const triggerRect = triggerElement.getBoundingClientRect();

        popupOverlay.style.display = 'block';
        popupOverlay.style.top = triggerRect.bottom + 'px';
        popupOverlay.style.left = triggerRect.left + 'px';
        document.addEventListener('click', closeOnClickOutside);
    }
    function closePopup() {
        popupOverlay.style.display = 'none';
        document.removeEventListener('click', closeOnClickOutside);
    }
    function closeOnClickOutside(e) {
        const isClickedOutside = !componentHandler.contains(e.target) && e.target !== triggerElement;
        if (isClickedOutside) {
            closePopup();
        }
    }
    if (triggerElement && popupOverlay) {
        triggerElement.addEventListener('click', openPopup);
    }
}

// FUNCTION FOR AI CHAT SCROLL TO BOTTOM
function scrollToBottom() {
    var chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

var userAIGlobalContainer = document.getElementById("userAIGlobalContainer");
var chatContainerNewChat = document.getElementById("chatContainerNewChat");
var newChat = document.getElementById("newChat");

// FUNCTION FOR TOGGLE CHAT CONTAINERS
function toggleChatContainers() {
    newChat.addEventListener("click", function () {
        if (chatContainerNewChat.style.display === "flex") {
            return;
        } else {
            if (userAIGlobalContainer.style.display === "block") {
                chatContainerNewChat.style.display = "flex";
                userAIGlobalContainer.style.display = "none";
                clearUserAIGlobalContainer();
                createNewChat();
            }
        }
    });
}

// FUNCTION FOR CLEARING CHAT CONTAINERS
function clearUserAIGlobalContainer() {
    var userAIGlobalContainer = document.getElementById("userAIGlobalContainer");
    userAIGlobalContainer.innerHTML = "";
    console.log("Contents of userAIGlobalContainer cleared");
}

// FUNCTION FOR NEW CHAT CREATION
function createNewChat() {
    var newChatContainer = document.createElement("div");
    var optionsParent = document.createElement("div");
    var optionsRecentChats = document.createElement("div");
    var recentChatImage = document.createElement("img");
    var chatTitle = document.createElement("p");
    var chatOptions = document.createElement("img");
    var chatOptionsContainer = document.createElement("div");

    newChatContainer.className = "recent-chat-area";
    optionsParent.className = "options-parent";
    optionsRecentChats.className = "options-recent-chats";
    recentChatImage.className = "icon-alternate-comment";
    chatTitle.className = "recent-chat-title";
    chatOptionsContainer.className = "chat-options-icon-container";
    chatOptions.className = "icon-options-vertical";

    chatTitle.textContent = "New Chat";

    recentChatImage.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316247/assets/xypeyme2vj1bcbsn8v20.svg";
    chatOptions.src = "https://res.cloudinary.com/dgrbrxs3g/image/upload/v1700316247/assets/hfu5rpkjcqasczs6fnml.svg";

    optionsRecentChats.appendChild(recentChatImage);
    optionsParent.appendChild(optionsRecentChats);
    optionsParent.appendChild(chatTitle);
    newChatContainer.appendChild(optionsParent);
    newChatContainer.appendChild(chatOptions);
    newChatContainer.appendChild(chatOptionsContainer);

    document.querySelector(".top-menu").appendChild(newChatContainer);

    var uniqueId = "newChat_" + Date.now();

    newChatContainer.id = uniqueId;
    console.log("New chat element created with ID: " + uniqueId);

    newChatContainer.addEventListener("click", function () {
        console.log("Element with ID " + uniqueId + " is clicked");
    });

    createPopup("recentChatOption", chatOptionsContainer);
}
toggleChatContainers();

// FUNCTION FOR SNACKBAR 
function snackBarFunction() {
    var aiMessageDiv = document.querySelector('.ai-chat-container');
    if (aiMessageDiv) {
        var textToCopy = aiMessageDiv.textContent.trim(aiMessageDivId);
        textToCopy = textToCopy.replace(/\s+/g, ' ').trim();

        if (textToCopy) {
            var tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);

            tempTextArea.select();
            document.execCommand('copy');

            document.body.removeChild(tempTextArea);
        }

        var snackbar = document.createElement('div');
        snackbar.className = "snackbar-container";
        snackbar.textContent = "Copied to Clipboard";

        document.body.appendChild(snackbar);

        snackbar.className += " show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace(" show", "");
            document.body.removeChild(snackbar);
        }, 3000);
    }
}

// EVENT LISTENER FOR SUGGESTIONS TAB
document.addEventListener("DOMContentLoaded", function () {
    suggestionElements.forEach((suggestion) => {
        suggestion.addEventListener("click", function () {
            const suggestionText = suggestion.querySelector("span").textContent;

            if (messageInput) {
                messageInput.value = suggestionText;
            }
        });
    });
});

// CONDITONAL STATEMENT FOR MENU BUTTON
/*iconMenu.addEventListener("click", () => {
    if (menuContainer.style.display === "none") {
        menuContainer.style.display = "flex";
    } else {
        menuContainer.style.display = "none";
    }
});*/

// EVENT LISTENER FOR LIGHT/DARK MODE
var mainChat = document.getElementById("mainChat");
var headerContainer = document.getElementById("headerContainer");
var footerContainer = document.getElementById("footerContainer");

function setThemeMode(isDarkMode) {
    mainChat.classList.toggle("dark-mode", isDarkMode);
    headerContainer.classList.toggle("dark-mode-header-footer", isDarkMode);
    footerContainer.classList.toggle("dark-mode-header-footer", isDarkMode);
    toggleButton.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function saveThemeMode(isDarkMode) {
    localStorage.setItem("darkMode", isDarkMode);
}

document.addEventListener("DOMContentLoaded", function () {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
        setThemeMode(savedDarkMode === "true");
    }

    toggleButton.addEventListener("click", function () {
        const isDarkMode = !mainChat.classList.contains("dark-mode");
        setThemeMode(isDarkMode);
        saveThemeMode(isDarkMode);

        localStorage.setItem("selectedTheme", isDarkMode ? "Dark" : "Light");
    });
});

window.addEventListener("storage", function (event) {
    if (event.key === "selectedTheme" && event.newValue !== null) {
        setThemeMode(event.newValue === "Dark");
    }
});


// EVENT LISTENER FOR MIC ICON
document.addEventListener('DOMContentLoaded', (event) => {
    let isListening = false;
    const micIcon = document.getElementById('micIcon');
    const messageInput = document.getElementById('messageInput');

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if ('SpeechRecognition' in window) {
        const recognition = new window.SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.lang = 'fil-PH';

        recognition.onstart = () => {
            micIcon.classList.add('beating');
            console.log('Voice recognition started. Speak now...');
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error occurred:', event.error);
            micIcon.classList.remove('beating');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            messageInput.value = transcript;
            micIcon.classList.remove('beating');
        };

        function toggleMic() {
            isListening = !isListening;

            if (isListening) {
                micIcon.classList.add('beating');
                messageInput.placeholder = "Artifici is listening...";
                recognition.start();
            } else {
                micIcon.classList.remove('beating');
                messageInput.placeholder = "Talk to Artifici...";
                recognition.stop();

            }
        }

        micIcon.addEventListener('click', toggleMic);
    } else {
        micIcon.classList.remove('beating');
        console.error('Speech recognition not supported');
    }
});

// FUNCTION FOR AUTO RESIZE TEXTAREA
function autoresizeTextarea() {
    $("#contact-form")
        .on("change keydown keyup paste cut", "textarea", function () {
            $(this)
                .height(0)
                .height(this.scrollHeight + 2);
            if ($(this).height() >= 100) {
                $("textarea#messageInput").css("overflow", "auto");
            } else {
                $("textarea#messageInput").css("overflow", "hidden");
            }
        })
        .find("textarea#messageInput")
        .change();
}
autoresizeTextarea();

// FUNCTION TO UPDATE LOCATION TEXT
function updateLocationText(location) {
    document.getElementById('location-text').textContent = location;
}

// FUNCTION TO UPDATE IP ADDRESS
function updateIPAddress(ip) {
    document.getElementById('ip-address').textContent = ip;
}

// FUNCTION TO GET USER LOCATION
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            let region = data.principalSubdivisionCode;

            const regionMap = {
                'PH-00': 'NCR',
                'PH-01': 'Ilocos Region',
                'PH-02': 'Cagayan Valley',
                'PH-03': 'Central Luzon',
                'PH-04': 'Calabarzon',
                'PH-05': 'Bicol Region',
                'PH-06': 'Western Visayas',
                'PH-07': 'Central Visayas',
                'PH-08': 'Eastern Visayas',
                'PH-09': 'Zamboanga Peninsula',
                'PH-10': 'Northern Mindanao',
                'PH-11': 'Davao Region',
                'PH-12': 'Soccsksargen',
                'PH-13': 'Caraga',
                'PH-14': 'Bangsamoro',
                'PH-15': 'Cordillera Administrative Region',
                'PH-16': 'Mimaropa'
            };

            if (regionMap[region]) {
                region = regionMap[region];
            }

            let country = data.countryName;
            country = country.replace(/\bthe\b/gi, '');
            country = country.replace(/\(|\)/g, '');

            const location = `${city}, ${region}, ${country}`;
            updateLocationText(location);
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            updateLocationText('Unable to retrieve your location.');
        });
}

// HANDLE ERROR RETRIEVING GEOLOCATION
function error() {
    updateLocationText('Unable to retrieve your location.');
}

// FUNCTION TO GET USER GEOLOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        updateLocationText('Geolocation is not supported by this browser.');
    }
}

// GET USER IP ADDRESS
function getIPAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            updateIPAddress(ip);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            updateIPAddress('Unable to retrieve your IP.');
        });
}

// UPDATE LOCATION ON CLICK
document.getElementById('update-location').addEventListener('click', function (event) {
    event.preventDefault();
    getLocation();
});

// GET IP ADDRESS AND LOCATION ON PAGE LOAD
window.onload = function () {
    getLocation();
    getIPAddress();
};

// CONSOLE MESSAGE FOR MODIFY CLICKS
modifyShorter.addEventListener('click', function () {
    console.log('Shorter is clicked!');
});

modifyLonger.addEventListener('click', function () {
    console.log('Longer is clicked!');
});
modifySimpler.addEventListener('click', function () {
    console.log('Simpler is clicked!');
});
modifyMoreCasual.addEventListener('click', function () {
    console.log('More Casual is clicked!');
});
modifyProfessional.addEventListener('click', function () {
    console.log('More Professional is clicked!');
});

// CONSOLE MESSAGE FOR RECENT CHAT CLICKS
recentPin.addEventListener('click', function () {
    console.log('Pin is clicked!');
});
recentRename.addEventListener('click', function () {
    console.log('Rename is clicked!');
});
recentArchive.addEventListener('click', function () {
    console.log('Archive is clicked!');
});
recentDelete.addEventListener('click', function () {
    console.log('Delete is clicked!');
});
