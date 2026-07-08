(function () {
    "use strict";

    const DEFAULT_PICTURE = "images/neha-introduction.jpg";

    const defaultValues = {
        firstName: "Neha",
        middleName: "",
        nickname: "",
        lastName: "Kamichetty",
        mascotAdjective: "Nice",
        mascotAnimal: "Kangaroo",
        divider: "|",
        acknowledgment:
            "I understand that what I post here is publicly viewable and won't post anything I don't want public here.",
        acknowledgmentDate: "06/18/2026",
        pictureAlt: "Neha Kamichetty smiling in a restaurant mirror while holding a phone.",
        pictureCaption: "In a restaurant mirror",
        personalStatement:
            "Hello everyone! My name is Neha Kamichetty. I am currently a student at UNC Charlotte and I am excited to continue developing my web development skills. I enjoy learning new technologies, working on creative projects, and building experiences that can help me in my future career.",
        personalBackground:
            "I was born in India and moved to the United States when I was 5 because of my dad's job. I lived in Irvine, California for 3 years before moving to North Carolina where I have lived ever since. I enjoy spending time with friends, traveling, and exploring new opportunities.",
        professionalBackground:
            "I have experience working as a tutor and interning at a startup.",
        academicBackground:
            "I am a rising senior at UNC Charlotte pursuing a Bachelor's degree in Computer Science while continuing to expand my technical skills.",
        subjectBackground:
            "I previously took this course, but I wasn't able to complete the assignments due to personal circumstances.",
        primaryComputer: "Windows laptop.",
        operatingSystem: "Windows 11.",
        backupComputer:
            "Going to the public library near me and working on the computers there.",
        quote: "Be curious, not judgmental.",
        quoteAuthor: "Walt Whitman",
        funnyThing:
            "I accidentally fell asleep at a 6 a.m. yoga class and woke up to the instructor laughing.",
        shareThing: "I speak 4 languages!",
        socialLinks: [
            { label: "CLT Web", url: "https://webpages.charlotte.edu/nkamiche/" },
            { label: "GitHub.io", url: "https://github.com/nkamiche/" },
            { label: "GitHub", url: "https://github.com/nkamiche" },
            { label: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/nehakamichetty/" }
        ],
        courses: [
            {
                department: "ITIS",
                number: "3135",
                name: "Front-End Web Application Development",
                reason:
                    "To strengthen my HTML, CSS, and JavaScript skills. And I need the credit!"
            }
        ]
    };

    const requiredFieldIds = [
        "firstName",
        "lastName",
        "mascotAdjective",
        "mascotAnimal",
        "divider",
        "acknowledgment",
        "acknowledgmentDate",
        "pictureAlt",
        "pictureCaption",
        "personalStatement",
        "personalBackground",
        "professionalBackground",
        "academicBackground",
        "subjectBackground",
        "primaryComputer",
        "operatingSystem",
        "backupComputer",
        "quote",
        "quoteAuthor",
        "socialLabel1",
        "socialUrl1",
        "socialLabel2",
        "socialUrl2",
        "socialLabel3",
        "socialUrl3",
        "socialLabel4",
        "socialUrl4",
        "socialLabel5",
        "socialUrl5"
    ];

    let uploadedPictureDataUrl = "";
    let courseCounter = 0;

    const form = document.getElementById("introduction-form");
    const main = document.getElementById("introduction-main");
    const coursesContainer = document.getElementById("courses-container");
    const pictureUpload = document.getElementById("pictureUpload");
    const picturePreview = document.getElementById("picturePreview");
    const formError = document.getElementById("formError");
    const outputContainer = document.getElementById("generated-output-container");

    if (!form || !main || !coursesContainer || !outputContainer) {
        return;
    }

    function showError(message) {
        formError.textContent = message;
        formError.hidden = false;
    }

    function hideError() {
        formError.textContent = "";
        formError.hidden = true;
    }

    function updateCourseTitles() {
        coursesContainer.querySelectorAll(".course-entry").forEach(function (entry, index) {
            const title = entry.querySelector(".course-entry-title");

            if (title) {
                title.textContent = `Course ${index + 1}`;
            }
        });
    }

    function escapeXml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }

    function xmlElement(tag, value) {
        return `<${tag}>${escapeXml(value)}</${tag}>`;
    }

    function showOutputPanel(panelId, headingText, content) {
        let panel = document.getElementById(panelId);

        if (!panel) {
            panel = document.createElement("section");
            panel.id = panelId;
            panel.className = "generated-output";
            panel.setAttribute("aria-labelledby", `${panelId}-title`);

            const heading = document.createElement("h3");
            heading.className = "output-title";
            heading.id = `${panelId}-title`;
            heading.textContent = headingText;

            const textarea = document.createElement("textarea");
            textarea.className = "generated-output-textarea";
            textarea.readOnly = true;
            textarea.setAttribute("aria-label", headingText);

            panel.appendChild(heading);
            panel.appendChild(textarea);
            outputContainer.appendChild(panel);
        } else {
            panel.querySelector(".output-title").textContent = headingText;
        }

        panel.querySelector(".generated-output-textarea").value = content;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function getInitials(firstName, middleName, lastName, nickname) {
        if (nickname.trim()) {
            return nickname.trim().charAt(0).toUpperCase();
        }

        let initials = firstName.trim().charAt(0).toUpperCase();

        if (middleName.trim()) {
            initials += middleName.trim().charAt(0).toUpperCase();
        }

        initials += lastName.trim().charAt(0).toUpperCase();
        return initials;
    }

    function buildFullName(data) {
        const parts = [data.firstName.trim()];

        if (data.middleName.trim()) {
            parts.push(data.middleName.trim());
        }

        parts.push(data.lastName.trim());
        return parts.join(" ");
    }

    function buildDisplayName(data) {
        const fullName = buildFullName(data);
        const mascot = `${data.mascotAdjective.trim()} ${data.mascotAnimal.trim()}`;
        return `${fullName} ${data.divider.trim()} ${mascot}`;
    }

    function setFieldValue(id, value) {
        const field = document.getElementById(id);

        if (field) {
            field.value = value;
        }
    }

    function getFieldValue(id) {
        const field = document.getElementById(id);
        return field ? field.value.trim() : "";
    }

    function createCourseEntry(courseData, index) {
        courseCounter += 1;
        const courseId = `course-${courseCounter}`;

        const article = document.createElement("article");
        article.className = "course-entry";
        article.dataset.courseId = courseId;

        article.innerHTML = `
            <div class="course-entry-header">
                <h4 class="course-entry-title">Course ${index + 1}</h4>
                <button type="button" class="delete-course button-danger">Delete</button>
            </div>
            <div class="form-field">
                <label for="${courseId}-department">Department</label>
                <input type="text" id="${courseId}-department" class="course-department" required value="${escapeHtml(courseData.department)}">
            </div>
            <div class="form-field">
                <label for="${courseId}-number">Course Number</label>
                <input type="text" id="${courseId}-number" class="course-number" required value="${escapeHtml(courseData.number)}">
            </div>
            <div class="form-field">
                <label for="${courseId}-name">Course Name</label>
                <input type="text" id="${courseId}-name" class="course-name" required value="${escapeHtml(courseData.name)}">
            </div>
            <div class="form-field">
                <label for="${courseId}-reason">Reason</label>
                <textarea id="${courseId}-reason" class="course-reason" required>${escapeHtml(courseData.reason)}</textarea>
            </div>
        `;

        article.querySelector(".delete-course").addEventListener("click", function () {
            const entries = coursesContainer.querySelectorAll(".course-entry");

            if (entries.length <= 1) {
                showError("At least one course is required.");
                return;
            }

            article.remove();
            updateCourseTitles();
            hideError();
        });

        return article;
    }

    function renderCourses(courses) {
        coursesContainer.innerHTML = "";
        courseCounter = 0;

        courses.forEach(function (course, index) {
            coursesContainer.appendChild(createCourseEntry(course, index));
        });
    }

    function populateDefaults() {
        setFieldValue("firstName", defaultValues.firstName);
        setFieldValue("middleName", defaultValues.middleName);
        setFieldValue("nickname", defaultValues.nickname);
        setFieldValue("lastName", defaultValues.lastName);
        setFieldValue("mascotAdjective", defaultValues.mascotAdjective);
        setFieldValue("mascotAnimal", defaultValues.mascotAnimal);
        setFieldValue("divider", defaultValues.divider);
        setFieldValue("acknowledgment", defaultValues.acknowledgment);
        setFieldValue("acknowledgmentDate", defaultValues.acknowledgmentDate);
        setFieldValue("pictureAlt", defaultValues.pictureAlt);
        setFieldValue("pictureCaption", defaultValues.pictureCaption);
        setFieldValue("personalStatement", defaultValues.personalStatement);
        setFieldValue("personalBackground", defaultValues.personalBackground);
        setFieldValue("professionalBackground", defaultValues.professionalBackground);
        setFieldValue("academicBackground", defaultValues.academicBackground);
        setFieldValue("subjectBackground", defaultValues.subjectBackground);
        setFieldValue("primaryComputer", defaultValues.primaryComputer);
        setFieldValue("operatingSystem", defaultValues.operatingSystem);
        setFieldValue("backupComputer", defaultValues.backupComputer);
        setFieldValue("quote", defaultValues.quote);
        setFieldValue("quoteAuthor", defaultValues.quoteAuthor);
        setFieldValue("funnyThing", defaultValues.funnyThing);
        setFieldValue("shareThing", defaultValues.shareThing);

        defaultValues.socialLinks.forEach(function (link, index) {
            setFieldValue(`socialLabel${index + 1}`, link.label);
            setFieldValue(`socialUrl${index + 1}`, link.url);
        });

        renderCourses(defaultValues.courses);

        uploadedPictureDataUrl = "";
        pictureUpload.value = "";
        picturePreview.src = DEFAULT_PICTURE;
        picturePreview.alt = defaultValues.pictureAlt;
        hideError();
    }

    function clearForm() {
        form.reset();
        renderCourses([
            {
                department: "",
                number: "",
                name: "",
                reason: ""
            }
        ]);

        uploadedPictureDataUrl = "";
        pictureUpload.value = "";
        picturePreview.src = DEFAULT_PICTURE;
        picturePreview.alt = "";
        hideError();
    }

    function getCoursesFromForm() {
        return Array.from(coursesContainer.querySelectorAll(".course-entry")).map(function (entry) {
            return {
                department: entry.querySelector(".course-department").value.trim(),
                number: entry.querySelector(".course-number").value.trim(),
                name: entry.querySelector(".course-name").value.trim(),
                reason: entry.querySelector(".course-reason").value.trim()
            };
        });
    }

    function getFormData() {
        return {
            firstName: getFieldValue("firstName"),
            middleName: getFieldValue("middleName"),
            nickname: getFieldValue("nickname"),
            lastName: getFieldValue("lastName"),
            mascotAdjective: getFieldValue("mascotAdjective"),
            mascotAnimal: getFieldValue("mascotAnimal"),
            divider: getFieldValue("divider"),
            acknowledgment: getFieldValue("acknowledgment"),
            acknowledgmentDate: getFieldValue("acknowledgmentDate"),
            pictureAlt: getFieldValue("pictureAlt"),
            pictureCaption: getFieldValue("pictureCaption"),
            personalStatement: getFieldValue("personalStatement"),
            personalBackground: getFieldValue("personalBackground"),
            professionalBackground: getFieldValue("professionalBackground"),
            academicBackground: getFieldValue("academicBackground"),
            subjectBackground: getFieldValue("subjectBackground"),
            primaryComputer: getFieldValue("primaryComputer"),
            operatingSystem: getFieldValue("operatingSystem"),
            backupComputer: getFieldValue("backupComputer"),
            quote: getFieldValue("quote"),
            quoteAuthor: getFieldValue("quoteAuthor"),
            funnyThing: getFieldValue("funnyThing"),
            shareThing: getFieldValue("shareThing"),
            courses: getCoursesFromForm(),
            socialLinks: [
                { label: getFieldValue("socialLabel1"), url: getFieldValue("socialUrl1") },
                { label: getFieldValue("socialLabel2"), url: getFieldValue("socialUrl2") },
                { label: getFieldValue("socialLabel3"), url: getFieldValue("socialUrl3") },
                { label: getFieldValue("socialLabel4"), url: getFieldValue("socialUrl4") },
                { label: getFieldValue("socialLabel5"), url: getFieldValue("socialUrl5") }
            ],
            pictureSrc: uploadedPictureDataUrl || DEFAULT_PICTURE
        };
    }

    function validateForm() {
        for (let i = 0; i < requiredFieldIds.length; i += 1) {
            const field = document.getElementById(requiredFieldIds[i]);

            if (!field || !field.value.trim()) {
                field.focus();
                showError(`Please complete the required field: ${field.labels[0].textContent.replace(" (optional)", "")}.`);
                return false;
            }
        }

        const courses = getCoursesFromForm();

        if (!courses.length) {
            showError("Please add at least one course.");
            return false;
        }

        for (let i = 0; i < courses.length; i += 1) {
            const course = courses[i];

            if (!course.department || !course.number || !course.name || !course.reason) {
                showError("Each course must include a department, number, name, and reason.");
                return false;
            }
        }

        hideError();
        return true;
    }

    function buildCoursesHtml(courses) {
        return courses
            .map(function (course) {
                return `${escapeHtml(course.department)} ${escapeHtml(course.number)} &ndash; ${escapeHtml(course.name)}: ${escapeHtml(course.reason)}`;
            })
            .join("<br>");
    }

    function buildOptionalListItem(label, value) {
        if (!value.trim()) {
            return "";
        }

        return `
            <li>
                <strong>${escapeHtml(label)}</strong>
                ${escapeHtml(value)}
            </li>
        `;
    }

    function buildResultHtml(data) {
        const initials = getInitials(data.firstName, data.middleName, data.lastName, data.nickname);
        const displayName = buildDisplayName(data);
        const coursesHtml = buildCoursesHtml(data.courses);
        const funnyItem = buildOptionalListItem(
            "Funny/Interesting Item to Remember Me By:",
            data.funnyThing
        );
        const shareItem = buildOptionalListItem("I'd Like to Share:", data.shareThing);

        return `
            <h2 class="page-title">Introduction Form</h2>

            <figure class="intro-photo">
                <img src="${escapeHtml(data.pictureSrc)}"
                     alt="${escapeHtml(data.pictureAlt)}"
                     width="280">
                <figcaption>${escapeHtml(data.pictureCaption)}</figcaption>
            </figure>

            <aside class="privacy-notice" aria-label="Public posting agreement">
                <p>
                    &ldquo;${escapeHtml(data.acknowledgment)}&rdquo;
                    <span class="signature">&mdash; ${escapeHtml(initials)} &mdash; ${escapeHtml(data.acknowledgmentDate)}</span>
                </p>
            </aside>

            <p class="intro-lead">${escapeHtml(data.personalStatement)}</p>

            <ul class="intro-details">
                <li>
                    <strong>Name:</strong>
                    ${escapeHtml(displayName)}
                </li>
                <li>
                    <strong>Personal Background:</strong>
                    ${escapeHtml(data.personalBackground)}
                </li>
                <li>
                    <strong>Professional Background:</strong>
                    ${escapeHtml(data.professionalBackground)}
                </li>
                <li>
                    <strong>Academic Background:</strong>
                    ${escapeHtml(data.academicBackground)}
                </li>
                <li>
                    <strong>Background in this Subject:</strong>
                    ${escapeHtml(data.subjectBackground)}
                </li>
                <li>
                    <strong>Primary Work Computer:</strong>
                    ${escapeHtml(data.primaryComputer)}
                </li>
                <li>
                    <strong>Operating System &amp; Version:</strong>
                    ${escapeHtml(data.operatingSystem)}
                </li>
                <li>
                    <strong>Backup Work Computer &amp; Location Plan:</strong>
                    ${escapeHtml(data.backupComputer)}
                </li>
                <li>
                    <strong>Courses I'm Taking &amp; Why:</strong>
                    ${coursesHtml}
                </li>
                ${funnyItem}
                ${shareItem}
            </ul>

            <blockquote class="intro-quote">
                <p>&ldquo;${escapeHtml(data.quote)}&rdquo;</p>
                <footer>&mdash; ${escapeHtml(data.quoteAuthor)}</footer>
            </blockquote>

            <p class="result-actions">
                <a href="#" id="fillFormAgain" class="reset-form-link">Fill out the form again</a>
            </p>
        `;
    }

    function buildGeneratedHtmlDocument(data) {
        const innerContent = buildResultHtml(data);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ITIS 3135 | Neha Kamichetty | Nice Kangaroo | Introduction Form</title>
    <link rel="stylesheet" href="styles/default.css">
</head>
<body class="introduction-page">
<main>
${innerContent}
</main>
</body>
</html>`;
    }

    function buildGeneratedXml(data) {
        const initials = getInitials(data.firstName, data.middleName, data.lastName, data.nickname);
        const displayName = buildDisplayName(data);

        const coursesXml = data.courses.map(function (course) {
            return `
    <course>
        ${xmlElement("department", course.department)}
        ${xmlElement("number", course.number)}
        ${xmlElement("name", course.name)}
        ${xmlElement("reason", course.reason)}
    </course>`;
        }).join("");

        const linksXml = data.socialLinks.map(function (link) {
            return `
    <link>
        ${xmlElement("label", link.label)}
        ${xmlElement("url", link.url)}
    </link>`;
        }).join("");

        return `<?xml version="1.0" encoding="UTF-8"?>
<introduction>
    <name>
        ${xmlElement("firstName", data.firstName)}
        ${xmlElement("middleName", data.middleName)}
        ${xmlElement("nickname", data.nickname)}
        ${xmlElement("lastName", data.lastName)}
        ${xmlElement("fullName", buildFullName(data))}
        ${xmlElement("displayName", displayName)}
        ${xmlElement("mascotAdjective", data.mascotAdjective)}
        ${xmlElement("mascotAnimal", data.mascotAnimal)}
        ${xmlElement("divider", data.divider)}
    </name>
    <acknowledgment>
        ${xmlElement("statement", data.acknowledgment)}
        ${xmlElement("initials", initials)}
        ${xmlElement("date", data.acknowledgmentDate)}
    </acknowledgment>
    <picture>
        ${xmlElement("src", data.pictureSrc)}
        ${xmlElement("alt", data.pictureAlt)}
        ${xmlElement("caption", data.pictureCaption)}
    </picture>
    ${xmlElement("personalStatement", data.personalStatement)}
    <backgrounds>
        ${xmlElement("personalBackground", data.personalBackground)}
        ${xmlElement("professionalBackground", data.professionalBackground)}
        ${xmlElement("academicBackground", data.academicBackground)}
        ${xmlElement("subjectBackground", data.subjectBackground)}
        ${xmlElement("primaryWorkComputer", data.primaryComputer)}
        ${xmlElement("operatingSystem", data.operatingSystem)}
        ${xmlElement("backupWorkComputer", data.backupComputer)}
    </backgrounds>
    <courses>${coursesXml}
    </courses>
    <quote>
        ${xmlElement("text", data.quote)}
        ${xmlElement("author", data.quoteAuthor)}
    </quote>
    ${xmlElement("funnyThing", data.funnyThing)}
    ${xmlElement("shareThing", data.shareThing)}
    <socialLinks>${linksXml}
    </socialLinks>
</introduction>`;
    }

    function showResult(data) {
        main.innerHTML = buildResultHtml(data);
        document.title = "ITIS 3135 | Neha Kamichetty | Nice Kangaroo | Introduction Form";

        const fillFormAgain = document.getElementById("fillFormAgain");

        if (fillFormAgain) {
            fillFormAgain.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.reload();
            });
        }
    }

    pictureUpload.addEventListener("change", function () {
        const file = pictureUpload.files[0];

        if (!file) {
            uploadedPictureDataUrl = "";
            picturePreview.src = DEFAULT_PICTURE;
            picturePreview.alt = getFieldValue("pictureAlt") || defaultValues.pictureAlt;
            return;
        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            uploadedPictureDataUrl = loadEvent.target.result;
            picturePreview.src = uploadedPictureDataUrl;
            picturePreview.alt = getFieldValue("pictureAlt") || "Uploaded introduction photo preview";
        };

        reader.readAsDataURL(file);
    });

    document.getElementById("addCourseButton").addEventListener("click", function () {
        const entries = coursesContainer.querySelectorAll(".course-entry");
        coursesContainer.appendChild(
            createCourseEntry(
                {
                    department: "",
                    number: "",
                    name: "",
                    reason: ""
                },
                entries.length
            )
        );
        hideError();
    });

    document.getElementById("resetFormButton").addEventListener("click", function () {
        populateDefaults();
    });

    document.getElementById("clearFormButton").addEventListener("click", function () {
        clearForm();
    });

    document.getElementById("generateHtmlButton").addEventListener("click", function () {
        const data = getFormData();
        showOutputPanel("generated-html-output", "Generated HTML", buildGeneratedHtmlDocument(data));
    });

    document.getElementById("generateJsonButton").addEventListener("click", function () {
        const data = getFormData();
        showOutputPanel("generated-json-output", "Generated JSON", JSON.stringify(data, null, 2));
    });

    document.getElementById("generateXmlButton").addEventListener("click", function () {
        const data = getFormData();
        showOutputPanel("generated-xml-output", "Generated XML", buildGeneratedXml(data));
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        showResult(getFormData());
    });

    populateDefaults();
})();
