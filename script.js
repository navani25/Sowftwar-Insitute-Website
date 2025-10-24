// --- Global Functions (needed for onclick attributes in HTML) ---

/**
 * Displays the course description popup on the welcome page.
 * This function is called via an onclick attribute in welcome page.html.
 */
function showCourseDescription(course) {
    const popup = document.getElementById("popup");
    const description = document.getElementById("courseDescription");

    if (popup && description) {
        let content = "Description not found.";
        // (Content for each course is truncated for brevity)
        switch (course) {
            case 'Web Development': content = "In the Web Development course, students delve into the comprehensive world of creating dynamic and interactive websites..."; break;
            case 'Software Engineering': content = "The Software Engineering course equips students with a robust foundation in software development methodologies and practices..."; break;
            case 'Data Science': content = "The Data Science course immerses students in the world of big data analytics and machine learning..."; break;
            case 'Cybersecurity': content = "The Cybersecurity course addresses the critical need for safeguarding digital assets in today's interconnected world..."; break;
            case 'Network Administration': content = "In the Network Administration course, students acquire the skills needed to design, implement, and manage robust computer networks..."; break;
            case 'Fullstack Development': content = "The Fullstack Development course offers a comprehensive journey through both front-end and back-end web technologies..."; break;
            case 'AWS Certification': content = "The AWS Certification course is designed to equip students with the skills needed to become proficient in cloud computing technologies..."; break;
            case 'Finance': content = "The Finance course provides students with a comprehensive understanding of financial principles and practices..."; break;
            case 'Marketing': content = "The Marketing course delves into the dynamic world of creating, communicating, and delivering value to customers..."; break;
            case 'Entrepreneurship': content = "The Entrepreneurship course empowers students to transform innovative ideas into successful ventures..."; break;
            case 'Management': content = "The Management course equips students with essential leadership and organizational skills..."; break;
            case 'International Business': content = "The International Business course provides students with a global perspective on business operations and strategies..."; break;
            case 'Graphic Design': content = "The Graphic Design course immerses students in the world of visual communication and creative expression..."; break;
            case 'UI/UX Design': content = "The UI/UX Design course focuses on creating seamless and intuitive user experiences across digital platforms..."; break;
            case 'Interior Design': content = "The Interior Design course immerses students in the art and science of creating functional and aesthetically pleasing interior spaces..."; break;
            case 'Fashion Design': content = "The Fashion Design course offers students a comprehensive exploration of the fashion industry..."; break;
            case 'Industrial Design': content = "The Industrial Design course focuses on creating innovative and ergonomic products that enhance user experiences..."; break;
            default: content = "Click on a specific course to see its description.";
        }
        description.textContent = content;
        popup.style.display = "flex";
    }
}

/**
 * Shows a success alert for the contact form.
 * This function is called via an onclick attribute in Contact.html.
 */
function showSuccessModal() {
    alert("Form submitted successfully!");
}


// --- Page-Specific Logic (runs after the DOM is loaded) ---

document.addEventListener("DOMContentLoaded", function() {

    // --- Navbar Active Link Highlighter ---
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // --- Logic for the Welcome Page Popup ---
    const popup = document.getElementById("popup");
    if (popup) {
        const closePopupButton = document.getElementById("closePopup");
        if (closePopupButton) {
            closePopupButton.addEventListener("click", () => {
                popup.style.display = "none";
            });
        }
        window.addEventListener("click", (event) => {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        });
    }

    // --- Logic for the Admission Form Validation ---
    const admissionForm = document.querySelector('.admission-form');
    if (admissionForm) {
        
        const displayErrorMessage = (field, message) => {
            let parent = field.closest('.form-group') || field.parentElement;
            clearErrorMessage(field);
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            parent.appendChild(errorElement);
        };

        const clearErrorMessage = (field) => {
            let parent = field.closest('.form-group') || field.parentElement;
            const errorElement = parent.querySelector('.error-message');
            if (errorElement) errorElement.remove();
        };

        admissionForm.addEventListener('input', (event) => {
            const target = event.target;
            if (['input', 'select', 'textarea'].includes(target.tagName.toLowerCase())) {
                clearErrorMessage(target);
            }
        });

        admissionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let formValid = true;
            const requiredFields = admissionForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (field.type === 'radio') {
                    const groupName = field.name;
                    if (!admissionForm.querySelector(`input[name="${groupName}"]:checked`)) {
                        formValid = false;
                        displayErrorMessage(admissionForm.querySelector(`input[name="${groupName}"]`), 'Please select an option');
                    } else {
                        clearErrorMessage(admissionForm.querySelector(`input[name="${groupName}"]`));
                    }
                } else if (!field.value.trim()) {
                    formValid = false;
                    displayErrorMessage(field, 'This field is required');
                }
            });

            if (formValid) {
                alert('Form is valid and ready to be submitted!');
                // admissionForm.submit(); // Uncomment to allow form submission
            } else {
                alert('Please fill out all required fields.');
            }
        });

        const resetBtn = document.getElementById("resetBtn");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                admissionForm.querySelectorAll('.error-message').forEach(e => e.remove());
            });
        }
    }
});