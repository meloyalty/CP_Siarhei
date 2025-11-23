const airports = {
    LAX: "Los Angeles Intl Arpt,Los Angeles",
    MIA: "Miami Intl,Miami",
    JFK: "John F.Kennedy Intl,New York",
    ORD: "O'Hare Intl,Chicago"
};

const fromCity = document.getElementById("fromCity");
const toCity = document.getElementById("toCity");

const fromCode = document.getElementById("fromCode");
const toCode = document.getElementById("toCode");

toCity.value = "MIA"; 
toCode.textContent = "MIA";

fromCity.addEventListener("change", () => {
    fromCode.textContent = fromCity.value;
});

toCity.addEventListener("change", () => {
    toCode.textContent = toCity.value;
});


document.getElementById("swapBtn").addEventListener("click", () => { 
    const temp = fromCity.value;
    fromCity.value = toCity.value;
    toCity.value = temp;

    fromCode.textContent = fromCity.value;
    toCode.textContent = toCity.value;
});

 document.addEventListener("DOMContentLoaded", function() {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const calendars = document.querySelectorAll(".booking-form__calendar-departure, .booking-form__calendar-return");

    calendars.forEach(calendar => {
        const dateSpan = calendar.querySelector(".booking-form__calendar-date");
        const navButtons = calendar.querySelectorAll(".booking-form__calendar-navigation-btn");
        const prevBtn = navButtons[0];
        const nextBtn = navButtons[1];

        function parseDate(str) {
            const parts = str.trim().split(" "); 
            const day = parseInt(parts[1], 10);
            const month = months.indexOf(parts[2]);
            if (month === -1 || isNaN(day)) {
                return new Date(); 
            }
            const today = new Date();
            let year = today.getFullYear();

            const tempDate = new Date(year, month, day);
            if (tempDate < today) {
                year += 1;
            }

            return new Date(year, month, day);
        }

        function formatDate(date) {
            return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
        }

        prevBtn.addEventListener("click", function() {
            const date = parseDate(dateSpan.textContent);
            date.setDate(date.getDate() - 1);
            dateSpan.textContent = formatDate(date);
        });

        nextBtn.addEventListener("click", function() {
            const date = parseDate(dateSpan.textContent);
            date.setDate(date.getDate() + 1);
            dateSpan.textContent = formatDate(date);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".info-section__bg-block, .info-section__info-block");
    elements
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.remove("animate-hidden");
                if (entry.target.classList.contains("inLeft")) {
                    entry.target.classList.add("animate__fadeInLeft");
                } else if (entry.target.classList.contains("inRight")) {
                    entry.target.classList.add("animate__fadeInRight");
                } else {
                    entry.target.classList.add("animate__fadeInUp");
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); 
  elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function() {
    const airplaneImg = document.querySelector(".spec-section__airplane-wrapper img");
    const cards = document.querySelectorAll(".spec-section__card");

    let currentAngle = 0; 

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            const airplaneRect = airplaneImg.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            const airplaneCenterX = airplaneRect.left + airplaneRect.width / 2;
            const airplaneCenterY = airplaneRect.top + airplaneRect.height / 2;

            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            let targetAngle = Math.atan2(cardCenterY - airplaneCenterY, cardCenterX - airplaneCenterX) * (180 / Math.PI) + 90;

            let delta = targetAngle - currentAngle;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            currentAngle += delta; 
            airplaneImg.style.transform = `rotate(${currentAngle}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            let delta = 0 - currentAngle;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;
            currentAngle += delta;
            airplaneImg.style.transform = `rotate(${currentAngle}deg)`; 
        });
    });
});

const mq = window.matchMedia("(min-width: 1270px)");
const cards = document.querySelectorAll(".membership__card");

function enableHoverEffects() {
    cards.forEach((card, index) => {
        card.addEventListener("mouseenter", card._mouseenter = () => {
            cards.forEach(c => c.style.borderRadius = "20px");

            if (index === 0) {
                cards[1].style.borderTopRightRadius = "0";
                cards[1].style.borderBottomRightRadius = "0";
                cards[2].style.borderTopLeftRadius = "0";
                cards[2].style.borderBottomLeftRadius = "0";
            } else if (index === 1) {
                cards[0].style.borderTopRightRadius = "0";
                cards[0].style.borderBottomRightRadius = "0";
                cards[2].style.borderTopLeftRadius = "0";
                cards[2].style.borderBottomLeftRadius = "0";
            } else if (index === 2) {
                cards[0].style.borderTopRightRadius = "0";
                cards[0].style.borderBottomRightRadius = "0";
                cards[1].style.borderTopLeftRadius = "0";
                cards[1].style.borderBottomLeftRadius = "0";
            }
        });

        card.addEventListener("mouseleave", card._mouseleave = () => {
            cards.forEach(c => c.style.borderRadius = "20px");
        });
    });
}

function disableHoverEffects() {
    cards.forEach(card => {
        if (card._mouseenter) {
            card.removeEventListener("mouseenter", card._mouseenter);
            card._mouseenter = null;
        }
        if (card._mouseleave) {
            card.removeEventListener("mouseleave", card._mouseleave);
            card._mouseleave = null;
        }
        card.style.borderRadius = "20px";
    });
}

function handleChange(e) {
    if (e.matches) {
        enableHoverEffects();
    } else {
        disableHoverEffects();
    }
}

mq.addEventListener("change", handleChange);

handleChange(mq);


const burger = document.querySelector('.header__nav-burger');
const menu = document.querySelector('.header__nav-menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');   // показать/скрыть меню
});

