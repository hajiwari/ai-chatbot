//EDITED
const genDeetsUsername = document.getElementById("genDeetsUsername");
const genDeetsEmail = document.getElementById("genDeetsEmail");
const genDeetsBirthdate = document.getElementById("genDeetsBirthdate");
const genDeetsPassword = document.getElementById("genDeetsPassword");
 
document.getElementById("genDeetsUsername").addEventListener("input", function () {
    // Remove characters that are not letters or numbers
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');

    // Limit the length to 20 characters
    if (this.value.length > 20) {
        this.value = this.value.substring(0, 36);
    }
});
function saveGeneralDetails() {
    const username = genDeetsUsername.value;
    const newEmail = genDeetsEmail.value;
    const birthday = genDeetsBirthdate.value;

    const user = firebase.auth().currentUser;
    const useruid = user.uid;
    const databaseRef = firebase.database().ref('users/' + useruid);

    // Update the user data in the Realtime Database
    const updates = {
        Username: username,
        Email: newEmail,
        Birthday: birthday,
    };
    databaseRef.update(updates)
        .then(function () {
            genDeetsBirthdate.disabled = true;
            genDeetsEmail.disabled = true;
            genDeetsUsername.disabled = true;

            // Optionally, you can update the input fields with the new values
            genDeetsUsername.value = username;
            genDeetsEmail.value = newEmail;
            genDeetsBirthdate.value = birthday;


            function snackBarFunction() {
                var snackbar = document.createElement('div');
                snackbar.className = "snackbar-container";
                snackbar.textContent = "Update successfully!";

                document.body.appendChild(snackbar);

                snackbar.className += " show";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace(" show", "");
                    document.body.removeChild(snackbar);
                }, 3000);
            }
            snackBarFunction();
        })
        .catch(function (error) {
            // Handle errors
            console.error('Failed to update user data:', error);
            // Optionally, provide feedback to the user
            alert('Failed to update user data. Please try again.');
        });
}

function editUserDetails() {
  genDeetsBirthdate.disabled = false;
  genDeetsEmail.disabled = false;
  genDeetsUsername.disabled = false;
}
document.getElementById("editButton").addEventListener("click", editUserDetails);
document.getElementById("saveSettings").addEventListener("click", saveGeneralDetails);




document.addEventListener("DOMContentLoaded", function () {
    // let timeoutId;
    // const timeoutDuration = 5 * 60 * 1000;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userId = user.uid;
            const userRef = database.ref("users/" + userId);
            userRef.on('value', snapshot => {
                const userData = snapshot.val();
                const imageData = userData.imageDataURL || '';
                if (imageData !== '') {
                    profileArea.src = imageData;
                } else {
                    profileArea.src = defaultImage;
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
                        "First_Name" in userData &&
                        "Middle_Name" in userData &&
                        "Last_Name" in userData &&
                        "Username" in userData &&
                        "Birthday" in userData &&
                        "Email" in userData &&
                        "Password" in userData &&
                        "Verified_Email" in userData
                    ) {
                        let username = userData.Username;
                        let birthdayDate = new Date(userData.Birthday);
                        let today = new Date();
                        if (
                            today.getMonth() < birthdayDate.getMonth() ||
                            (today.getMonth() === birthdayDate.getMonth() && today.getDate() < birthdayDate.getDate())
                        ) {
                            menuAge--;
                        }
                        let menuBirthday =
                            userData.Birthday;
                        let menuAge = today.getFullYear() - birthdayDate.getFullYear();
                        let menuUsername = username.split("@")[0];
                        let menuFullName = `${userData.First_Name} ${userData.Middle_Name} ${userData.Last_Name}`;
                        let menuEmail = `${userData.Email}`;
                        let menuVerified = userData.Verified_Email ? "Verified" : "Unverified";

                        document.getElementById("profileFullName").textContent = menuFullName;
                        document.getElementById("profileAge").textContent = menuAge;
                        document.getElementById("profileBirthday").textContent = menuBirthday;
                        document.getElementById("profileUserName").innerHTML = menuUsername;

                        document.getElementById("profileContEmail").value = menuEmail;
                        document.getElementById("profileContUserId").value = userId;
                        document.getElementById("profileContVerified").value = menuVerified;
                        document.getElementById("genDeetsFullname").value = menuFullName;
                        document.getElementById("genDeetsUsername").value = menuUsername;
                        document.getElementById("genDeetsEmail").value = menuEmail;
                        document.getElementById("genDeetsBirthdate").value = menuBirthday;


                    } else {
                        console.error("Required properties are missing in user data");
}

                        // errors
                        var newPasswordReq = document.getElementById("newPasswordReq");
                        var samePassword = document.getElementById("samePassword");
                        var misNewPassword = document.getElementById("misNewPassword");
                        var misCurrentPassword = document.getElementById("misCurrentPassword");
                        var noInput = document.getElementById("noInput");
                        //inputs
                        const oldPasswordInput = document.getElementById("oldPassword");
                        const newPasswordInput = document.getElementById("newPassword");
                        const confirmPasswordInput = document.getElementById("confirmPassword");
                        const changePasswordButton = document.getElementById("changePasswordButton");
                        // Function to check if the input meets password requirements
                        function isPasswordValid(password) {
                            const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
                            return regex.test(password);
                        }
                        // Function to enable or disable the button based on input completion
                        function updateButtonState() {
                            const isInputComplete = oldPasswordInput.value && newPasswordInput.value && confirmPasswordInput.value;
                            changePasswordButton.classList.toggle("active", isInputComplete);
                        }
                        // Event listener for input changes
                        oldPasswordInput.addEventListener("input", updateButtonState);
                        newPasswordInput.addEventListener("input", updateButtonState);
                        confirmPasswordInput.addEventListener("input", updateButtonState);
                        // Event listener for form submission
                        document.getElementById("account-settings-form").addEventListener("submit", function (event) {
                            changePasswordButton.classList.remove("active");
                            event.preventDefault(); // Prevents the form from submitting
                            const user = firebase.auth().currentUser;
                            const currentPassword = oldPasswordInput.value;
                            const newPassword = newPasswordInput.value;
                            // Reauthenticate the user before updating the password
                            const credential = firebase.auth.EmailAuthProvider.credential(
                                user.email,
                                currentPassword
                            );
                            if (oldPasswordInput.value === "" || newPasswordInput.value === ""||confirmPasswordInput.value === ""){
                                alert("Please complete the form before proceeding.");
                                return;
                            }
                            else{
                            user.reauthenticateWithCredential(credential)
                                .then(() => {
                                    // Password is reauthenticated, now update the password
                                    if (!isPasswordValid(newPassword)) {
                                        setTimeout(function () {
                                            changePasswordButton.classList.add("active");
                                        }, 2000);
                                        hideAllError();
                                        newPasswordReq.style.display = "flex";

                                        return;
                                    } else if (currentPassword === newPassword) {
                                        setTimeout(function () {
                                            changePasswordButton.classList.add("active");
                                        }, 2000);
                                        hideAllError();
                                        samePassword.style.display = "flex";                                     
                                        return;
                                    }
                                    else if (newPasswordInput.value != confirmPasswordInput.value) {
                                        setTimeout(function () {
                                            changePasswordButton.classList.add("active");
                                        }, 2000);
                                        hideAllError();
                                        misNewPassword.style.display = "flex";                                     
                                        return;
                                    }  
                                    
                                    else {
                                        user.updatePassword(newPassword)
                                            .then(() => {
                                                // Update the password in the Realtime Database
                                                const userId = user.uid;
                                                const databaseRef = firebase.database().ref('users/' + userId);
                                                databaseRef.update({ Password: newPassword });

                                                function snackBarFunction() {
                                                    var snackbar = document.createElement('div');
                                                    snackbar.className = "snackbar-container";
                                                    snackbar.textContent = "Password updated successfully!";
                
                                                    document.body.appendChild(snackbar);
                
                                                    snackbar.className += " show";
                                                    setTimeout(function () {
                                                        snackbar.className = snackbar.className.replace(" show", "");
                                                        document.body.removeChild(snackbar);
                                                    }, 3000);
                                                }
                                                oldPasswordInput.value = "";
                                                newPasswordInput.value = "";
                                                confirmPasswordInput.value = "";
                                                hideAllError();
                                                snackBarFunction();
                                                
                                                
                                                // alert("Password updated successfully!");
                                                // Reset the form or perform additional actions if needed
                                            })
                                            .catch((error) => {
                                                // setTimeout(function () {
                                                //     changePasswordButton.classList.add("active");
                                                // }, 2000);
                                                // alert("Error updating password: " + error.message);
                                            });
                                    }
                                })
                                .catch((error) => {
                                    setTimeout(function () {
                                        changePasswordButton.classList.add("active");
                                    }, 2000);
                                    hideAllError();
                                    misCurrentPassword.style.display = "flex";                                     
                                    return;
                                });
                            }
                        });
                        function hideAllError() {
                            noInput.style.display = "none";
                            newPasswordReq.style.display = "none";
                            samePassword.style.display = "none";
                            misNewPassword.style.display = "none";
                            misCurrentPassword.style.display = "none";
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                });
        } else {
            //window.location.href = "/login";
        }
    });
    // TIME OUT
    // function resetTimeout() {
    //     clearTimeout(timeoutId);
    //     timeoutId = setTimeout(() => {
    //         window.location.href = "/login";
    //     }, timeoutDuration);
    // }
    // document.addEventListener("mousemove", resetTimeout);
    // document.addEventListener("keydown", resetTimeout);
    // document.addEventListener("click", resetTimeout);
});
// FUNCTION FOR UPLOADING IMAGE TO FIREBASE
function handleChange(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileArea.src = e.target.result;
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

document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const displayParam = urlParams.get('display');

    const containers = {
        'profile': document.getElementById("profileMainContainer"),
        'uploaded-files': document.getElementById("uploadedFilesContainer"),
        'settings': document.getElementById("settingsContainer"),
        'updates': document.getElementById("updatesContainer"),
        'about': document.getElementById("aboutContainer"),
        'help': document.getElementById("helpContainer")
    };

    if (displayParam && containers.hasOwnProperty(displayParam)) {
        Object.keys(containers).forEach(key => {
            containers[key].style.display = key === displayParam ? 'flex' : 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.vertical-tab');
    const tabContents = document.querySelectorAll('.setting-details');
    const subDetails = document.querySelectorAll('.general-settings');
    const tabContainers = document.querySelectorAll('.setting-title > div');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            const currentTabContainer = tab.closest('.setting-title').querySelector('div');

            tabContents.forEach(content => {
                content.style.display = content.id === `${tabId}-tab` ? 'block' : 'none';
            });

            tabContainers.forEach(container => {
                container.classList.remove('focus-setting-main');
            });
            currentTabContainer.classList.add('focus-setting-main');
            subDetails.forEach(subDetail => {
                subDetail.classList.remove('focus-setting');
            });
        });
    });
    subDetails.forEach(subDetail => {
        subDetail.addEventListener('click', () => {
            const detailText = subDetail.textContent.trim();
            const tabIdMap = {
                'General Details': 'general-settings-tab',
                'Account Security': 'personal-settings-tab',
                'Account Deletion': 'personal-settings-tab',
                'Data Controls': 'personal-settings-tab',
                'Language': 'preferences-tab',
                'Theme': 'preferences-tab',
                'Notification': 'preferences-tab',
                'Artifici Voice Settings': 'preferences-tab'
            };
            const tabId = tabIdMap[detailText];
            if (tabId) {
                showTab(tabId);

                subDetail.classList.add('focus-setting');
                subDetails.forEach(element => {
                    if (element !== subDetail) {
                        element.classList.remove('focus-setting');
                    }
                });
                tabContainers.forEach(container => {
                    container.classList.remove('focus-setting-main');
                });
                const mainTabContainer = subDetail.closest('.setting-sub-details').previousElementSibling.querySelector('div');
                mainTabContainer.classList.add('focus-setting-main');

            }
        });
    });

    function showTab(tabId) {
        const tabContents = document.querySelectorAll('.setting-details');
        tabContents.forEach(content => {
            content.style.display = content.id === tabId ? 'block' : 'none';
        });
    }
});

var backBtnHelp = document.getElementById("backBtnHelp");
var backBtnAbout = document.getElementById("backBtnAbout");
var backNavigation = document.getElementById("backNavigation");
var backBtnProfile = document.getElementById("backBtnProfile");
var backBtnUpdates = document.getElementById("backBtnUpdates");

document.addEventListener("DOMContentLoaded", function () {
    backNavigation.addEventListener("click", () => {
        window.location.href = "/chat_page";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    backBtnAbout.addEventListener("click", function () {
        window.location.href = "/chat_page";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    backBtnHelp.addEventListener("click", function () {
        window.location.href = "/chat_page";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    backBtnProfile.addEventListener("click", function () {
        window.location.href = "/chat_page";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    backBtnUpdates.addEventListener("click", function () {
        window.location.href = "/chat_page";
    });
});


// VOICE SELECTION
document.addEventListener('DOMContentLoaded', function () {
    var voicesLoaded = false;
    var voices = [];

    if (window.responsiveVoice && responsiveVoice.getVoices().length > 0) {
        voices = responsiveVoice.getVoices();
        voicesLoaded = true;
    }

    if (!voicesLoaded) {
        var intervalId = setInterval(function () {
            if (responsiveVoice.getVoices().length > 0) {
                voices = responsiveVoice.getVoices();
                voicesLoaded = true;
                clearInterval(intervalId);
                initialize();
            }
        }, 100);
    } else {
        initialize();
    }

    function initialize() {
        var voiceSelect = document.getElementById("lang");
        var voicePlayButton = document.getElementById("voicePlayButton");
        var voiceStopButton = document.getElementById("voiceStopButton");
        var rateSlider = document.getElementById("rate");
        var pitchSlider = document.getElementById("pitch");
        var volumeSlider = document.getElementById("volume");
        var rateValue = document.getElementById("rate-value");
        var pitchValue = document.getElementById("pitch-value");
        var volumeValue = document.getElementById("volume-value");
        var currentVoice = "UK English Female";

        voices.forEach(function (voice) {
            var option = document.createElement("option");
            option.value = voice.name;
            option.text = voice.name;
            voiceSelect.appendChild(option);
        });

        voicePlayButton.addEventListener("click", function () {
            var selectedVoice = voiceSelect.value || "Default";
            var settings = {
                rate: parseFloat(rateSlider.value),
                pitch: parseFloat(pitchSlider.value),
                volume: parseInt(volumeSlider.value),
                onstart: function () {
                    console.log("Voice started");
                },
                onend: function () {
                    console.log("Voice ended");
                }
            };
            responsiveVoice.speak("Hello there. I'm arteefeecee. Testing Voice", selectedVoice, settings);
            currentVoice = selectedVoice;
        });

        voiceStopButton.addEventListener("click", function () {
            responsiveVoice.cancel();
            console.log("Voice stopped");
        });

        rateSlider.addEventListener("input", function () {
            rateValue.textContent = rateSlider.value;
        });

        pitchSlider.addEventListener("input", function () {
            pitchValue.textContent = pitchSlider.value;
        });

        volumeSlider.addEventListener("input", function () {
            volumeValue.textContent = volumeSlider.value;
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    let hasChanges = false;
    function setChanges() {
        hasChanges = true;
        showSaveButton();
    }

    function showSaveButton() {
        const saveButton1 = document.querySelector('.save-button1');
        const saveButton2 = document.querySelector('.save-button2');
        const saveButton3 = document.querySelector('.save-button3');
        saveButton1.style.display = 'block';
        saveButton2.style.display = 'block';
        saveButton3.style.display = 'block';
    }

    function handleBeforeUnload(event) {
        if (hasChanges) {
            const message = 'You have unsaved changes. Are you sure you want to leave?';
            event.returnValue = message;
            return message;
        }
    }

    const inputElements = document.querySelectorAll('input, select, textarea');
    inputElements.forEach(element => {
        element.addEventListener('input', setChanges);
    });

    window.addEventListener('beforeunload', handleBeforeUnload);

    const saveButton1 = document.querySelector('.save-button1');
    saveButton1.addEventListener('click', function () {
        hasChanges = false;
        saveButton1.style.display = 'none';
    });
    const saveButton2 = document.querySelector('.save-button2');
    saveButton2.addEventListener('click', function () {
        hasChanges = false;
        saveButton2.style.display = 'none';
    });
    const saveButton3 = document.querySelector('.save-button3');
    saveButton3.addEventListener('click', function () {
        hasChanges = false;
        saveButton3.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sliders = [
        { inputId: 'rate', valueId: 'rate-value' },
        { inputId: 'pitch', valueId: 'pitch-value' },
        { inputId: 'volume', valueId: 'volume-value' }
    ];

    const dropdowns = [
        { inputId: 'lang', valueId: 'lang-value' },
        { inputId: 'thme', valueId: 'thme-value' }
    ];

    const checkboxes = [
        { inputId: 'notif', valueId: 'notif' },
        { inputId: 'news', valueId: 'news' }
    ];

    const inputs = [...sliders, ...dropdowns, ...checkboxes];

    setTimeout(function () {
        const selectElement = document.querySelector('.goog-te-combo');
        const optionElement = selectElement.querySelector('option[value=""]');
        if (optionElement) {
            optionElement.textContent = 'Choose Language';
        }
    }, 1000);

    function saveValues() {
        inputs.forEach(input => {
            const element = document.getElementById(input.inputId);
            if (element.type === 'checkbox') {
                localStorage.setItem(input.inputId, element.checked);
            } else {
                localStorage.setItem(input.inputId, element.value);
            }
        });

    }

    function resetValues() {
        inputs.forEach(input => {
            const element = document.getElementById(input.inputId);
            const valueElement = document.getElementById(input.valueId);

            if (element.type === 'checkbox') {
                element.checked = false;
            } else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
                valueElement.textContent = element.options[element.selectedIndex].textContent;
            } else if (element.tagName === 'INPUT' && element.type === 'range') {
                element.value = element.defaultValue;
                valueElement.textContent = element.defaultValue;
            }
            localStorage.removeItem(input.inputId);
        });
    }

    function resetTranslate() {
        const translateElement = document.querySelector('.goog-te-combo');
        translateElement.value = 'en';
        const event = new Event('change', { bubbles: true });
        translateElement.dispatchEvent(event);
        localStorage.removeItem('googleTranslateElement');
    }

    inputs.forEach(input => {
        const element = document.getElementById(input.inputId);
        const valueElement = document.getElementById(input.valueId);

        const savedValue = localStorage.getItem(input.inputId);
        if (savedValue !== null) {
            if (element.type === 'checkbox') {
                element.checked = savedValue === 'true';
            } else {
                element.value = savedValue;
                if (element.tagName === 'SELECT') {
                    valueElement.textContent = element.options[element.selectedIndex].textContent;
                } else if (element.tagName === 'INPUT' && element.type === 'range') {
                    valueElement.textContent = savedValue;
                }
            }
        } else {
            resetValues();
        }

        element.addEventListener('input', function () {
            if (element.type === 'checkbox') {
                saveValues();
            } else {
                if (element.tagName === 'SELECT') {
                    valueElement.textContent = element.options[element.selectedIndex].textContent;
                } else if (element.tagName === 'INPUT' && element.type === 'range') {
                    valueElement.textContent = element.value;
                }
                saveValues();
            }
        });
    });

    const saveButton = document.getElementById('saveSettings');
    saveButton.addEventListener('click', function () {
        saveValues();
    });

    const resetButton1 = document.getElementById('resetSettings1');
    resetButton1.addEventListener('click', function () {
        resetValues();
        resetTranslate();
        location.reload();
    });
    const resetButton2 = document.getElementById('resetSettings2');
    resetButton2.addEventListener('click', function () {
        resetValues();
        resetTranslate();
        location.reload();
    });
    const resetButton3 = document.getElementById('resetSettings3');
    resetButton3.addEventListener('click', function () {
        resetValues();
        resetTranslate();
        location.reload();
    });
});

var themeDropdown = document.getElementById("thme");
var headerContainer = document.getElementById("headerContainer");
var footerContainer = document.getElementById("footerContainer");
var menuPage = document.getElementById("menuPage");
var lightDarkToggle = document.getElementById("lightDarkToggle");

function applyTheme(selectedTheme) {
    headerContainer.classList.remove("dark-mode-header-footer");
    footerContainer.classList.remove("dark-mode-header-footer");
    menuPage.classList.remove("dark-mode");

    if (selectedTheme === "Dark") {
        headerContainer.classList.add("dark-mode-header-footer");
        footerContainer.classList.add("dark-mode-header-footer");
        menuPage.classList.add("dark-mode");
    }
}

function toggleDarkMode() {
    var selectedTheme = themeDropdown.value === "Dark" ? "Light" : "Dark";
    localStorage.setItem("selectedTheme", selectedTheme);
    themeDropdown.value = selectedTheme;
    applyTheme(selectedTheme);
}

themeDropdown.addEventListener("change", function () {
    var selectedTheme = themeDropdown.value;
    localStorage.setItem("selectedTheme", selectedTheme);
    applyTheme(selectedTheme);
});

var storedTheme = localStorage.getItem("selectedTheme");
if (storedTheme) {
    themeDropdown.value = storedTheme;
    applyTheme(storedTheme);
}

window.addEventListener("storage", function (event) {
    if (event.key === "selectedTheme") {
        themeDropdown.value = event.newValue;
        applyTheme(event.newValue);
    }
});

lightDarkToggle.addEventListener("click", toggleDarkMode);
