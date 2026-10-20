const translations = {
    es: {
        pageTitle: "Currículum | Marc Ibáñez",
        metaDescription: "Currículum de Marc Ibáñez, desarrollador de software junior.",
        hero: {
            eyebrow: "Currículum Vitae",
            title: "Desarrollador de Software Junior | Frontend & Backend",
            summary: "Desarrollador de software junior con formación en Desarrollo de Aplicaciones Web en IES El Caminàs y actualmente cursando una especialización en Desarrollo de Videojuegos. He desarrollado proyectos personales de aplicaciones web y software, y realicé prácticas FCT en NTT DATA, donde tuve mi primera experiencia en entorno corporativo. Busco incorporarme a un equipo donde seguir creciendo en frontend, backend o desarrollo general, aportando capacidad de adaptación, aprendizaje continuo y compromiso."
        },
        sections: {
            experience: "Experiencia",
            projects: "Proyectos",
            education: "Formación",
            skills: "Competencias Técnicas",
            languages: "Idiomas",
            additional: "Información Adicional",
            contact: "Contacto"
        },
        experience: {
            ntt: {
                period: "Prácticas FCT | Marzo 2025 - Mayo 2025",
                description: "Primera experiencia en un entorno profesional corporativo, con adaptación a dinámicas reales de trabajo en consultoría tecnológica. Durante este periodo tuve contacto con Kotlin Multiplatform y Jetpack Compose desde una base de aprendizaje, ampliando mi visión sobre nuevas herramientas y entornos de desarrollo."
            }
        },
        projects: {
            disperson: {
                type: "Proyecto de aplicación web",
                description1: "Aplicación web relacionada con tests de personalidad, con almacenamiento de datos de usuario y visualización de perfiles interpretativos.",
                description2: "Trabajo centrado en lógica backend, gestión de datos y estructuración de la aplicación."
            },
            dndManager: {
                type: "Aplicación web",
                description1: "Aplicación web para la gestión de campañas y personajes.",
                description2: "Trabajo enfocado en la estructura de la interfaz, componentes reutilizables, manejo de datos y experiencia de usuario."
            },
            pactumx: {
                type: "Proyecto personal",
                description1: "Proyecto personal centrado en programación de sistemas, lógica y arquitectura de código.",
                description2: "Trabajo orientado a la organización técnica del proyecto y la estructuración del software."
            }
        },
        education: {
            daw: "CFGS Desarrollo de Aplicaciones Web (DAW) | 2023 - 2025",
            specialization: "Curso de Especialización en Desarrollo de Videojuegos | 2025 - Actualidad",
            bachillerato: "Bachillerato Científico-Técnico | 2021 - 2023"
        },
        skills: {
            frontend: {
                title: "Frontend",
                items: "HTML5, CSS3, JavaScript, jQuery, diseño responsive"
            },
            backend: {
                title: "Backend y Bases de Datos",
                items: "Java, PHP, SQL, MySQL"
            },
            tools: {
                title: "Herramientas",
                items: "Git, GitHub, Bootstrap"
            },
            other: {
                title: "Otros conocimientos",
                items: "C#, XML/RSS, maquetación web y documentación técnica"
            }
        },
        languages: {
            spanish: "Español: nativo",
            english: "Inglés: C1 Cambridge"
        },
        additional: {
            license: "Permiso de conducir y vehículo propio",
            interest: "Interés en posiciones junior de frontend, backend o desarrollo de software general",
            profile: "Perfil adaptable, orientado al aprendizaje continuo y al trabajo en equipo"
        },
        labels: {
            technologies: "Tecnologías:"
        }
    },
    en: {
        pageTitle: "Resume | Marc Ibáñez",
        metaDescription: "Resume of Marc Ibáñez, junior software developer.",
        hero: {
            eyebrow: "Resume",
            title: "Junior Software Developer | Frontend & Backend",
            summary: "Junior software developer with training in Web Application Development at IES El Caminàs and currently completing a specialization in Video Game Development. I have developed personal web application and software projects, and I completed FCT internship training at NTT DATA, where I had my first experience in a corporate environment. I am looking to join a team where I can continue growing in frontend, backend or general software development, contributing adaptability, continuous learning and commitment."
        },
        sections: {
            experience: "Experience",
            projects: "Projects",
            education: "Education",
            skills: "Technical Skills",
            languages: "Languages",
            additional: "Additional Information",
            contact: "Contact"
        },
        experience: {
            ntt: {
                period: "FCT Internship | March 2025 - May 2025",
                description: "First experience in a professional corporate environment, adapting to real work dynamics in technology consulting. During this period, I had exposure to Kotlin Multiplatform and Jetpack Compose from a learning perspective, broadening my view of new tools and development environments."
            }
        },
        projects: {
            disperson: {
                type: "Web application project",
                description1: "Web application related to personality tests, with user data storage and interpretive profile display.",
                description2: "Work focused on backend logic, data handling and application structure."
            },
            dndManager: {
                type: "Web application",
                description1: "Web application for campaign and character management.",
                description2: "Work focused on interface structure, reusable components, data handling and user experience."
            },
            pactumx: {
                type: "Personal project",
                description1: "Personal project focused on systems programming, logic and code architecture.",
                description2: "Work focused on the technical organization of the project and software structure."
            }
        },
        education: {
            daw: "Higher Vocational Diploma in Web Application Development (DAW) | 2023 - 2025",
            specialization: "Specialization Course in Video Game Development | 2025 - Present",
            bachillerato: "Scientific-Technological Baccalaureate | 2021 - 2023"
        },
        skills: {
            frontend: {
                title: "Frontend",
                items: "HTML5, CSS3, JavaScript, jQuery, responsive design"
            },
            backend: {
                title: "Backend & Databases",
                items: "Java, PHP, SQL, MySQL"
            },
            tools: {
                title: "Tools",
                items: "Git, GitHub, Bootstrap"
            },
            other: {
                title: "Other Knowledge",
                items: "C#, XML/RSS, web layout and technical documentation"
            }
        },
        languages: {
            spanish: "Spanish: native",
            english: "English: C1 Cambridge"
        },
        additional: {
            license: "Driver's license and own vehicle",
            interest: "Interested in junior frontend, backend or general software development roles",
            profile: "Adaptable profile, focused on continuous learning and teamwork"
        },
        labels: {
            technologies: "Technologies:"
        }
    }
};

function getTranslationValue(language, key) {
    return key.split(".").reduce((value, segment) => {
        if (value && Object.prototype.hasOwnProperty.call(value, segment)) {
            return value[segment];
        }
        return undefined;
    }, translations[language]);
}

function applyLanguage(language) {
    const selectedLanguage = translations[language] ? language : "en";
    const metaDescription = document.querySelector('meta[name="description"]');

    document.documentElement.lang = selectedLanguage;
    document.title = translations[selectedLanguage].pageTitle;

    if (metaDescription) {
        metaDescription.setAttribute("content", translations[selectedLanguage].metaDescription);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const translatedText = getTranslationValue(selectedLanguage, element.dataset.i18n);

        if (typeof translatedText === "string") {
            element.textContent = translatedText;
        }
    });

    document.querySelectorAll(".language-button").forEach((button) => {
        const isActive = button.dataset.lang === selectedLanguage;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const browserLanguage = navigator.language && navigator.language.toLowerCase().startsWith("es") ? "es" : "en";

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => {
            applyLanguage(button.dataset.lang);
        });
    });

    applyLanguage(browserLanguage);
});
