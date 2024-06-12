function quizAlert(){
    // si le form est correctement rempli
    if (quizConfirm()){
        let button = document.getElementById("btn_concours");
        
        if (button.disabled ){
            alert('Vous vous êtes déjà enregistré');
        } else {
            button.disabled = true;
            alert(`Vous avez été enregistré avec succès ${document.getElementById("pseudo").value}`);
        }
        
        setTimeout(() => {
            beginningQuiz(), 100;
        });
    } else {
        alert("Veuillez remplir tous les champs !");
    }
}

function quizConfirm() {
    var pseudo = document.getElementById("pseudo").value;
    var mail = document.getElementById("mail").value;
    var date_suivi = document.getElementById("date_suivi").value;
    var statut = document.getElementById("statut").value;
    
    // tester si les champs sont vides
    return !(pseudo === "" || mail === "" || date_suivi === "" || statut === "");
}

function beginningQuiz(){
    var compte = 3;
    let p = document.createElement("p");
    p.textContent = `Début du Quiz dans ${compte}`;
    let quiz_div = document.getElementById("quiz");
    
    // compte à rebours : 
    quiz_div.appendChild(p);

    var interval = setInterval(function () {
        compte--;
        p.textContent = `Début du Quiz dans ${compte}`;
        if (compte == 0) {
            clearInterval(interval);
            p.textContent = "A votre avis quels sont les sons les plus écoutés ?";
            // afficher le quiz
            createRandomQuiz();
        }
    }, 1000);
}

function createRandomQuiz(){
    let tab = [
        `<div class="choix">
            <img src="../img/8hsonne.jpeg">
            <p class="titre">8h sonne</p>
        </div>`,
        `<div class="choix">
            <img src="../img/24fev.jpg">
            <p class="titre">24 fevrier</p>
        </div>`,
        `<div class="choix">
            <img src="../img/517RgSAL5uL._UXNaN_FMjpg_QL85_.jpg">
            <p class="titre">Crises d'Angoisses</p>
        </div>`,
        `<div class="choix">
            <img src="../img/XS.jpeg">
            <p class="titre">XS</p>
        </div>`
    ];
    
    let indice_dispo = [0, 1, 2, 3];
    let choix = document.createElement('form');
    let len = tab.length;
    choix.classList.add("contenu");
    for (let i = 0; i < len; i++) {
        let indice = Math.floor(Math.random() * indice_dispo.length);
        let select = `<select name="reponse" id="selectRep${i + 1}" required>
            <option value="" disabled selected>Votre réponse</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>`;
        choix.innerHTML += `<div id="divReponse${i + 1}">` + tab[indice_dispo[indice]] + select + `</div>`;
        indice_dispo.splice(indice, 1);
    }
    choix.innerHTML += `<input type="button" id="btn_concours_submit" value="Valider" onclick="validateQuiz()">`;
    document.getElementById("quiz").appendChild(choix);
}

function validateQuiz() {
    let selects = [
        document.getElementById("selectRep1"),
        document.getElementById("selectRep2"),
        document.getElementById("selectRep3"),
        document.getElementById("selectRep4")
    ];

    for (let select of selects) {
        if (select.value === "") {
            alert("Veuillez saisir toutes vos réponses");
            return;
        }
    }

    let valeurs = selects.map(select => select.value);
    if (new Set(valeurs).size !== valeurs.length) {
        alert("Certaines réponses sont identiques, deux titres ne peuvent pas être ex aequo");
        return;
    }

    let case1 = document.getElementById("reponse1");
    let case2 = document.getElementById("reponse2");
    let case3 = document.getElementById("reponse3");
    let case4 = document.getElementById("reponse4");

    case1.innerHTML = document.querySelector("#divReponse" + (valeurs.indexOf("1") + 1) + " .choix").innerHTML;
    case2.innerHTML = document.querySelector("#divReponse" + (valeurs.indexOf("2") + 1) + " .choix").innerHTML;
    case3.innerHTML = document.querySelector("#divReponse" + (valeurs.indexOf("3") + 1) + " .choix").innerHTML;
    case4.innerHTML = document.querySelector("#divReponse" + (valeurs.indexOf("4") + 1) + " .choix").innerHTML;

    // Calcul pourcentage :
    let resultat_des_fans = document.querySelectorAll(".resultat_fan .titre");
    let resultat_utilisateur = document.querySelectorAll(".resultat_utilisateur .titre");
    let somme = 0;
    for (let i = 0; i < 4; i++) {
        if (resultat_utilisateur[i] && resultat_des_fans[i].innerText === resultat_utilisateur[i].innerText) {
            somme++;
        }
    }
    let p_result = document.getElementById("similarite");
    p_result.innerText = `${(somme / 4) * 100} % de Similarité avec les fans`;

    // Attribution statut
    let p_statut_resultats = document.getElementById("statut_resultats");
    if (somme > 3) {
        p_statut_resultats.innerText = `Tu es un.e vrai Fan !🤍`;
    } else if (somme === 0) {
        p_statut_resultats.innerText = `Hello Newbie✨`;
    } else {
        p_statut_resultats.innerText = `Tu es un.e vrai Connaisseur.se💜`;
    }

    // Affichage des réponses :
    document.querySelector(".contenu").innerHTML = "";
    let resultats = document.getElementById("resultats");
    document.querySelector("#quiz p").innerText = "";
    resultats.style.display = "block";
}

function menuDeroulant(parametres) {
    let menu_deroulant = document.getElementById("menu_deroulant");
    if (parametres == 'open') {
        menu_deroulant.style.display = "flex";
        document.getElementById("=").style.display = "none";
    } else if (parametres == 'close') {
        menu_deroulant.style.display = "none";
        document.getElementById("=").style.display = "block";
    } else {
        console.log("Erreur");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    let delay = 0;

    function updateCount(counter, index) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => updateCount(counter, index), 1);
        } else {
            counter.innerText = target;
            setTimeout(() => {
                showLogo(index);
                if (index < counters.length - 1) {
                    setTimeout(() => updateCount(counters[index + 1], index + 1), 1000);
                }
            }, 500);
        }
    }

    function showLogo(index) {
        const logos = document.querySelectorAll('.logo');
        if (logos[index]) {
            logos[index].style.display = 'inline-block';
            logos[index].classList.add('bounce');
        }
    }

    setTimeout(() => updateCount(counters[0], 0), delay);
});
