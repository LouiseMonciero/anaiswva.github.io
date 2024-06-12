
function quizAlert(){
    // si le form est correctement rempli
    if (quizConfirm()){
        let button = document.getElementById("btn_concours");
        
        if (button.disabled ){
            alert('Vous vous êtes déjà enregistré');
        }else{
            button.disabled = true;
            alert(`Vous avez été enregistré avec succées ${document.getElementById("pseudo").value}`);
        }
        
        setTimeout(()=>{
            beginningQuiz(),100
        })
    }else {
        alert("Veuillez remplir tous les champs !");
    }
}

function quizConfirm() {
    var pseudo = document.getElementById("pseudo").value;
    var mail = document.getElementById("mail").value;
    var date_suivi = document.getElementById("date_suivi").value;
    var statut = document.getElementById("statut").value;
    
    //tester si les champs sont vides
    if (pseudo === "" || mail === "" || date_suivi === "" || statut === "") {
        return false;
    } else {
        return true;
    }
}

function beginningQuiz(){
    var compte = 3;
    let p = document.createElement("p");
    p.textContent = `Début du Quiz dans ${compte}`;
    let quiz_div = document.getElementById("quiz");
    
    // compte à rebours : 

    //ajouter le message à la pagie à la suite du bouton d'id start
    quiz_div.appendChild(p);

    //en utilisant la fonction setInterval qui s'exécute toutes les secondes
    var interval = setInterval(function () {
        compte--;
        p.textContent = `Début du Quiz dans ${compte}`;
        if (compte == 0) {
            clearInterval(interval);
            p.textContent = "A votre avis quel sont les sons les plus écoutés ?";
            // afficher le quiz
            createRandomQuiz();
        }
    }, 1000);
}

function createRandomQuiz(){
    let tab = [`<div class="choix">
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
            ]
    
    // Créer le quiz avec les questions dans un ordre aléatoire : 
    let indice_dispo = [0,1,2,3]
    let choix = document.createElement('form');
    let len = tab.length;
    choix.classList.add("contenu");
    for (let i=0; i<len;i++){
        let indice = Math.floor(Math.random() * indice_dispo.length)
        let select = `<select name="reponse" id="selectRep${i+1}" required>
    <option value="" disabled selected>Votre réponse</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
</select>`
        choix.innerHTML =  choix.innerHTML +`<div id="divReponse${i+1}">` + tab[indice_dispo[indice]] + select +`</div>`;
        // suppression de l'indice
        let indice_a_suppr = indice_dispo.indexOf(indice_dispo[indice]);
        if (indice_a_suppr !== -1) {
            indice_dispo.splice(indice_a_suppr, 1);
        }
    }
    choix.innerHTML += `<input type="button" id="btn_concours_submit" value="Valider" onclick="validateQuiz()">`;
    let quiz_div = document.getElementById("quiz");
    quiz_div.appendChild(choix);
}

function validateQuiz(){
    if (selectRep1.value === "" || selectRep2.value === "" || selectRep3.value === "" || selectRep4 === ""){
        alert ("Veuillez saisir toutes vos réponses");
    }else if (selectRep1.value === selectRep2.value || selectRep1.value === selectRep3.value || selectRep1.value === selectRep4.value || selectRep2.value === selectRep3.value || selectRep2.value === selectRep4.value || selectRep3.value === selectRep4.value) { // il y a des nombres identiques
        alert("Certaines réponses sont identiques, deux titres ne peuvent pas être exequaux");
    }
    else{
        let contenu = document.querySelector(".contenu");

        // Remplissage tableau :
        let selects = [selectRep1, selectRep2, selectRep3, selectRep4];
        let case1;
        let case2;
        let case3;
        let case4;
        selects.forEach((select, index) => {
            let reponseId = `reponse${index + 1}`;
            let reponseElement = document.getElementById(reponseId);
            
            switch (select.value) {
                case "1":
                    case1 = reponseElement;
                    break;
                case "2":
                    case2 = reponseElement;
                    break;
                case "3":
                    case3 = reponseElement;
                    break;
                case "4":
                    case4 = reponseElement;
                    break;
                default:
                    console.log(`Valeur inattendue pour selectRep${index + 1}: ${select.value}`);
                    break;
            }
        });
        //let case1 = document.getElementById("reponse1");
        let reponseUtilisateur1 = document.querySelector("#divReponse1 .choix");
        case1.innerHTML = reponseUtilisateur1.innerHTML;

        //let case2 = document.getElementById("reponse2");
        let reponseUtilisateur2 = document.querySelector("#divReponse2 .choix");
        case2.innerHTML = reponseUtilisateur2.innerHTML;

        //let case3 = document.getElementById("reponse3");
        let reponseUtilisateur3 = document.querySelector("#divReponse3 .choix");
        case3.innerHTML = reponseUtilisateur3.innerHTML;

        //let case4 = document.getElementById("reponse4");
        let reponseUtilisateur4 = document.querySelector("#divReponse4 .choix");
        case4.innerHTML = reponseUtilisateur4.innerHTML;
    

        // Calcul pourcentage : 
        let resultat_des_fans = document.querySelectorAll(".resultat_fan .titre");
        let resultat_utilisateur = document.querySelectorAll(".resultat_utilisateur .titre");
        //console.log(resultat_des_fans);
        //console.log(resultat_utilisateur);
        let somme = 0;
        for (let i=0; i<4; i++){
            if  (resultat_utilisateur[i] === undefined){
                if(i===0){
                somme+=1;
                }
            }else if ( resultat_des_fans[i].innerText === resultat_utilisateur[i].innerText ){
                somme = somme+1;
            }
        }
        let p_result = document.getElementById("similarite");
        p_result.innerText = `${somme/4*100} % de Similarité avec les fans`;

        // Attribution statut
        let p_statut_resultats = document.getElementById("statut_resultats");
        if (somme >3){
            p_statut_resultats.innerText =`Tu es un.e vrai Fan !🤍`;
        }else if (somme ===0){
            p_statut_resultats.innerText = `Hello Newbie✨`;
        }else{
            p_statut_resultats.innerText = `Tu es un.e vrai Connaisseur.se💜`;
        }

    // Affichage des réponses : 
    contenu.innerHTML = "";
    let resultats = document.getElementById("resultats");
    let p = document.querySelector("#quiz p");
    p.innerText = "";
    resultats.style.display = "block";
    }
}

function menuDeroulant(parametres){
    let menu_deroulant = document.getElementById("menu_deroulant")
    if (parametres == 'open'){
        menu_deroulant.style.display = "flex";
        document.getElementById("=").style.display ="none";
    }else if (parametres == 'close'){
        menu_deroulant.style.display = "none";
        document.getElementById("=").style.display ="block";
    }else{
        console.log("Erreur");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Change value to speed up or slow down
    let delay = 0; // Delay for cascade effect

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
                    setTimeout(() => updateCount(counters[index + 1], index + 1), 1000); // Start next counter
                }
            }, 500); // Wait for 0.5 second before showing the logo
        }
    }

    function showLogo(index) {
        const logos = document.querySelectorAll('.logo');
        if (logos[index]) {
            logos[index].style.display = 'inline-block';
            logos[index].classList.add('bounce');
        }
    }

    setTimeout(() => updateCount(counters[0], 0), delay); // Start first counter
});
