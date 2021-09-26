window.onload = function() {
    // gets lists of matches and players previously used from localStorage
    var matches = JSON.parse(localStorage.getItem("matches") || "[]");
    var players = JSON.parse(localStorage.getItem("players") || "[]");

    // ensures newMatch works correctly
    jQuery(function($) {
        $("#selectA").trigger("change");
        $("#selectB").trigger("change");
    });

    // disables various submit buttons, they get enabled when conditions are met
    $("#submitMatch").prop("disabled", true);
    $("#submitPair").prop("disabled", true);
    $("#submitPlayerHistory").prop("disabled", true);
    $("#submitGameHistory").prop("disabled", true);

    function Player(n, w, l, s) {
        this.name = n;
        this.wins = w;
        this.losses = l;
        this.sets = s;
    }

    function Match(pA, pB, r, st, or, dt) {
        this.nameA = pA;
        this.nameB = pB;
        this.result = r;
        this.sets = st;
        this.order = or;
        this.date = dt;
    }

    // creates new Player object from new playerName input, adds it to players array
    $("#submitPlayer").click(function() {
        const newPlayer = new Player($("#playerName").val(), 0, 0, 0);
        if($("#playerName").val()===""){
            $("#duplicateNames").text("Please enter a name!");
            return;
        }
        for (i = 0; i < players.length; i++) {
            if (players[i].name === $("#playerName").val()) {
                $("#duplicateNames").text("That player already exists! Enter a new one!");
                return;
            }
        }
        players.push(newPlayer);
        localStorage["players"] = JSON.stringify(players);
        $("#playerName").val("");
        $("#duplicateNames").text("");
        if (players.length > 1) {
            $("#morePlayers").text("");
        }
    });

    // checks if everything is correct in newMatch form before enabling its submit button
    $(document).on("change focusout mouseleave", ".newMatch", function() {
        var a1 = Number(newMatch.a1.value);
        var a2 = Number(newMatch.a2.value);
        var a3 = Number(newMatch.a3.value);
        var a4 = Number(newMatch.a4.value);
        var a5 = Number(newMatch.a5.value);
        var b1 = Number(newMatch.b1.value);
        var b2 = Number(newMatch.b2.value);
        var b3 = Number(newMatch.b3.value);
        var b4 = Number(newMatch.b4.value);
        var b5 = Number(newMatch.b5.value);
        var a1s = $("#a1s");
        var a2s = $("#a2s");
        var a3s = $("#a3s");
        var a4s = $("#a4s");
        var a5s = $("#a5s");
        var b1s = $("#b1s");
        var b2s = $("#b2s");
        var b3s = $("#b3s");
        var b4s = $("#b4s");
        var b5s = $("#b5s");
        var sArr = [a1s, a2s, a3s, a4s, a5s, b1s, b2s, b3s, b4s, b5s];
        var selA = $("#selectA option:selected").text();
        var selB = $("#selectB option:selected").text();
        var p1 = $("#p1");
        var p2 = $("#p2");
        var p3 = $("#p3");
        var p4 = $("#p4");
        var p5 = $("#p5");
        var winner = $("#winner");
        var ws = " wins this set!";
        var aPoints = 0;
        var bPoints = 0;
        var p1k = $("#p1k");
        var p2k = $("#p2k");
        var p3k = $("#p3k");
        var p4k = $("#p4k");
        var p5k = $("#p5k");

        function SetScore(a, b, p, pk, as, bs) {
            if ((((a - b) > 1 || (b - a) > 1) && ((a === 11 || b === 11))) || (((a - b) === 2 || (b - a) === 2) && (a > 11 || b > 11))) {
                if (a > b) {
                    p.html(selA + ws);
                    aPoints += 1;
                    pk.html(selA + " is the Set Winner 🏆 ");
                    $(as).css("background-color", "#5CDB95");
                } else {
                    p.html(selB + ws);
                    bPoints += 1;
                    pk.html( selB + " is the Set Winner 🏆");
                    $(bs).css("background-color", "#5CDB95");
                }
            } else {
                p.html("");
                pk.html("");
                $(as).css("background-color", "white");
                $(bs).css("background-color", "white");
            }
        }


        if ((selA !== selB) && (selA !== "" && selB !== "")) {
            SetScore(a1, b1, p1, p1k, a1s, b1s);
            SetScore(a2, b2, p2, p2k, a2s, b2s);
            SetScore(a3, b3, p3, p3k, a3s, b3s);
            SetScore(a4, b4, p4, p4k, a4s, b4s);
            SetScore(a5, b5, p5, p5k, a5s, b5s);
        } else {
            p1k.html("");
            p2k.html("");
            p3k.html("");
            p4k.html("");
            p5k.html("");
            for (i = 0; i < sArr.length; i++) {
                $(sArr[i]).css("background-color", "#ffffff");
            }
        }
        if ((aPoints > 2 || bPoints > 2) && ((aPoints < 4) && (bPoints < 4)) && (selA !== selB) && (selA !== "" && selB !== "")) {
            if (aPoints > bPoints) {
                winner.html(selA + " wins this match! Submit it and add another one.");
            } else {
                winner.html(selB + " wins this match! Submit it and add another one.");
            }
            $("#submitMatch").prop("disabled", false);
        } else {
            winner.html("");
            p1.html("");
            p2.html("");
            p3.html("");
            p4.html("");
            p5.html("");
            $("#submitMatch").prop("disabled", true);
        }
    });

    // submits newMatch to matches array, adds stats to players objects, saves match to localStorage
    $("#submitMatch").click(function(e) {
        var a1 = Number(newMatch.a1.value);
        var a2 = Number(newMatch.a2.value);
        var a3 = Number(newMatch.a3.value);
        var a4 = Number(newMatch.a4.value);
        var a5 = Number(newMatch.a5.value);
        var b1 = Number(newMatch.b1.value);
        var b2 = Number(newMatch.b2.value);
        var b3 = Number(newMatch.b3.value);
        var b4 = Number(newMatch.b4.value);
        var b5 = Number(newMatch.b5.value);
        var sa1 = "";
        var sa2 = "";
        var sa3 = "";
        var sa4 = "";
        var sa5 = "";
        var sb1 = "";
        var sb2 = "";
        var sb3 = "";
        var sb4 = "";
        var sb5 = "";
        var aPointsFinal = 0;
        var bPointsFinal = 0;
        if (a1 > b1) {
            aPointsFinal += 1;
        }
        if (a2 > b2) {
            aPointsFinal += 1;
        }
        if (a3 > b3) {
            aPointsFinal += 1;
        }
        if (a4 > b4) {
            aPointsFinal += 1;
        }
        if (a5 > b5) {
            aPointsFinal += 1;
        }
        if (b1 > a1) {
            bPointsFinal += 1;
        }
        if (b2 > a2) {
            bPointsFinal += 1;
        }
        if (b3 > a3) {
            bPointsFinal += 1;
        }
        if (b4 > a4) {
            bPointsFinal += 1;
        }
        if (b5 > a5) {
            bPointsFinal += 1;
        }
        if ((a1 || b1) > 10) {
            sa1 += String(a1);
            sb1 += String(b1);
        }
        if ((a2 || b2) > 10) {
            sa2 += String(a2);
            sb2 += String(b2);
        }
        if ((a3 || b3) > 10) {
            sa3 += String(a3);
            sb3 += String(b3);
        }
        if ((a4 || b4) > 10) {
            sa4 += String(a4);
            sb4 += String(b4);
        }
        if ((a5 || b5) > 10) {
            sa5 += String(a5);
            sb5 += String(b5);
        }
        for (i = 0; i < players.length; i++) {
            if ($("#selectA").val() === players[i].name) {
                if (aPointsFinal > bPointsFinal) {
                    players[i].wins += 1;
                }
                if (aPointsFinal < bPointsFinal) {
                    players[i].losses += 1;
                }
            }
            if ($("#selectB").val() === players[i].name) {
                if (bPointsFinal > aPointsFinal) {
                    players[i].wins += 1;
                }
                if (aPointsFinal > bPointsFinal) {
                    players[i].losses += 1;
                }
            }
        }
        for (i = 0; i < players.length; i++) {
            if ($("#selectA").val() === players[i].name) {
                players[i].sets += aPointsFinal;
            }
            if ($("#selectB").val() === players[i].name) {
                players[i].sets += bPointsFinal;
            }
        }
        var selA = $("#selectA option:selected").text();
        var selB = $("#selectB option:selected").text();
        var res = String(aPointsFinal) + "-" + String(bPointsFinal);
        var sets = sa1 + "-" + sb1 + "/" + sa2 + "-" + sb2 + "/" + sa3 + "-" + sb3 + "/" + sa4 + "-" + sb4 + "/" + sa5 + "-" + sb5;
        var ord = matches.length;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        today = dd + "/" + mm + "/" + yyyy;
        const match = new Match(selA, selB, res, sets, 0, "");
        matches.push(match);
        matches[ord].order = ord + 1;
        matches[ord].date = today;
        localStorage["matches"] = JSON.stringify(matches);
        localStorage["players"] = JSON.stringify(players);
        aPointsFinal = 0;
        bPointsFinal = 0;
        $("#p1").html("");
        $("#p2").html("");
        $("#p3").html("");
        $("#p4").html("");
        $("#p5").html("");
        $("#p1k").html("");
        $("#p2k").html("");
        $("#p3k").html("");
        $("#p4k").html("");
        $("#p5k").html("");
        $("#winner").html("");
        $("#newMatch")[0].reset();
        $("#submitMatch").prop("disabled", true);
    });

    // adds options to dropdown selectA from players array alphabetically
    $("#selectA").on("focus", function(e) {
        $("#selectA").empty();
        if (players.length < 2) {
            $("#morePlayers").text("Add at least two players!");
        }
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        players.forEach(function(item) {
            var option = new Option(item.name, item.name);
            $("#selectA").append($(option));
        });
    });

    // adds options to dropdown selectB from players array alphabetically
    $("#selectB").on("focus", function(e) {
        $("#selectB").empty();
        if (players.length < 2) {
            $("#morePlayers").text("Add at least two players!");
        }
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        players.forEach(function(item) {
            var option = new Option(item.name, item.name);
            $("#selectB").append($(option));
        });
    });

    // adds options to dropdown pastA from players array alphabetically
    $("#pastA").on("focus", function(e) {
        $("#pastP").text("");
        $("#pastA").empty();
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        players.forEach(function(item) {
            var option = new Option(item.name, item.name);
            $("#pastA").append($(option));
        });
        $("#pastA").prepend("<option value='' selected='selected'></option>");
    });

    // adds options to dropdown pastB from players array alphabetically
    $("#pastB").on("focus", function(e) {
        $("#pastP").text("");
        $("#pastB").empty();
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        players.forEach(function(item) {
            var option = new Option(item.name, item.name);
            $("#pastB").append($(option));
        });
        $("#pastB").prepend("<option value='' selected='selected'></option>");
    });

    // enables submit button in pastMatches if two different players are selected 
    $(document).on("change", ".past", function() {
        var pstA = $("#pastA option:selected").text();
        var pstB = $("#pastB option:selected").text();
        if ((pstA !== "") && (pstB !== "") && (pstA !== pstB)) {
            $("#submitPair").prop("disabled", false);
        } else {
            $("#submitPair").prop("disabled", true);
        }
    });

    // shows all matches played by selected players in pastMatches 
    $("#submitPair").click(function(e) {
        var psA = $("#pastA option:selected").text();
        var psB = $("#pastB option:selected").text();
        var objFiltA = matches.filter(function(v) {
            return (v.nameA === psA || v.nameA === psB)
        });
        var objFiltB = objFiltA.filter(function(v) {
            return (v.nameB === psA || v.nameB === psB)
        });
        if (objFiltB.length === 0) {
            $("#pastP").html("No matches between these two players, pick others!");
            $("#pastMatches")[0].reset();
            $("#submitPair").prop("disabled", true);
        } else {
            var str = "";
            for (b = 0; b < objFiltB.length; b++) {
                str += "GAME: " + objFiltB[b].order + ".)  " + objFiltB[b].nameA + " vs. " + objFiltB[b].nameB +
                    "  SCORE: " + objFiltB[b].result + "  SETS: (" + objFiltB[b].sets + ")  DATE: " + objFiltB[b].date + "<br>";
            }
            $("#pastP").html(str);
            $("#pastMatches")[0].reset();
            $("#submitPair").prop("disabled", true);
        }
    });

    // enables submit button in playerHistory if player is selected
    $(document).on("change", ".phis", function() {
        var ph = $("#player option:selected").text();
        if (ph !== "") {
            $("#submitPlayerHistory").prop("disabled", false);
        } else {
            $("#submitPlayerHistory").prop("disabled", true);
        }
    });

    // adds options to player dropdown select alphabetically
    $("#player").on("focus", function(e) {
        $("#playerStats").html("");
        $("#playerHis").html("");
        $("#player").empty();
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        players.forEach(function(item) {
            var option = new Option(item.name, item.name);
            $("#player").append($(option));
        });
        $("#player").prepend("<option value='' selected='selected'></option>");
    });

    // shows all matches played by selected player
    $("#submitPlayerHistory").click(function(e) {
        var ph = $("#player option:selected").text();
        var objFilt = matches.filter(function(v) {
            return (v.nameA === ph || v.nameB === ph)
        });
        var objFiltPlayer = players.filter(function(v) {
            return (v.name === ph)
        });
        if (objFilt.length === 0) {
            $("#playerStats").html("");
            $("#playerHis").html("This player didn´t play yet, pick another!");
            $("#playerHistory")[0].reset();
            $("#submitPlayerHistory").prop("disabled", true);
        } else {
            $("#playerStats").html(
                "NAME: " + objFiltPlayer[0].name + "  WINS: " + objFiltPlayer[0].wins + "  LOSSES: " +
                objFiltPlayer[0].losses + "  SETS WON: " + objFiltPlayer[0].sets);
            var str = "";
            for (b = 0; b < objFilt.length; b++) {
                str += "GAME: " + objFilt[b].order + ".) " + objFilt[b].nameA + " vs. " + objFilt[b].nameB + "  SCORE: " +
                    objFilt[b].result + "  SETS: (" + objFilt[b].sets + ")  DATE: " + objFilt[b].date + "<br>";
            }
            $("#playerHis").html(str);
            $("#playerHistory")[0].reset();
            $("#submitPlayerHistory").prop("disabled", true);
        }
    });

    // enables gameHistory submit button if game is selected
    $(document).on("change", ".ghis", function() {
        var gh = $("#game option:selected").text();
        if (gh !== "") {
            $("#submitGameHistory").prop("disabled", false);
        } else {
            $("#submitGameHistory").prop("disabled", true);
        }
    });

    // adds options to game dropdown select sorted by order of games played
    $("#game").on("focus", function(e) {
        $("#gameHis").html("");
        $("#otherGames").html("");
        $("#game").empty();
        matches.forEach(function(item) {
            var option = new Option((item.order + ". " + item.nameA + "-" + item.nameB), item.order);
            $("#game").append($(option));
        });
        $("#game").prepend("<option value='' selected='selected'></option>");
    });

    // shows game selected and all games played by two players that participated in it 
    $("#submitGameHistory").click(function(e) {
        var gh = $("#game option:selected").val();
        var clonedMatches = JSON.parse(JSON.stringify(matches));
        var objFilt = matches.filter(function(v) {
            return (String(v.order) == gh)
        });
        if (objFilt.length === 0) {
            $("#gameHis").html("No such match, pick another!");
            $("#gameHistory")[0].reset();
            $("#submitGameHistory").prop("disabled", true);
        } else {
            $("#gameHis").html(
                "GAME: " + objFilt[0].order + ".) " + objFilt[0].nameA + " vs. " + objFilt[0].nameB +
                "  SCORE: " + objFilt[0].result + "  SETS: (" + objFilt[0].sets + ")  DATE: " + objFilt[0].date + "<br>");
            var or = objFilt[0].order;
            var nA = objFilt[0].nameA;
            var nB = objFilt[0].nameB;
            var objFiltA = clonedMatches.filter(function(v) {
                return (v.nameA === nA || v.nameA === nB);
            });
            var objFiltB = objFiltA.filter(function(v) {
                return (v.nameB === nA || v.nameB === nB);
            });
            var objFiltC = objFiltB.filter(function(v) {
                return (v.order !== or);
            });
            var str = "Other games played by this pair of players:" + "<br>";
            for (b = 0; b < objFiltC.length; b++) {
                str += "GAME " + objFiltC[b].order + ".) " + objFiltC[b].nameA +
                    " vs. " + objFiltC[b].nameB + "  SCORE: " + objFiltC[b].result +
                    " SETS: (" + objFiltC[b].sets + ")  DATE: " + objFiltC[b].date + "<br>";
            }
            $("#otherGames").html(str);
        }
        $("#gameHistory")[0].reset();
        $("#submitGameHistory").prop("disabled", true);
    });

    // shows all matches history
    $("#matchHistory").on("click", function(e) {
        if ($("#allMatches").html() === "") {
            var str = "";
            for (a = 0; a < matches.length; a++) {
                str += "GAME: " + matches[a].order + ".) " + matches[a].nameA + " vs. " + matches[a].nameB +
                    "  SCORE: " + matches[a].result + "  SETS: (" + matches[a].sets + ")  DATE: " + matches[a].date + "<br>";
            }
            $("#allMatches").html(str);
        } else {
            $("#allMatches").html("");
        }
    });

    // compares objects on .wins
    function compareWins(p1, p2) {
        if (p1.wins < p2.wins)
            return 3;
        if (p1.wins > p2.wins)
            return -3;
        return 0;
    }

    // if .wins are equal, compares objects on difference between wins and losses
    function compareDiff(p1, p2) {
        if (p1.wins === p2.wins) {
            if (p1.diff < p2.diff)
                return 1;
            if (p1.diff > p2.diff)
                return -1;
            return 0;
        }
    }

    // if both above conditions are equal compares objects on sets won by the player
    function compareSets(p1, p2) {
        if ((p1.wins === p2.wins) && (p1.diff === p2.diff)) {
            if (p1.sets < p2.sets)
                return 1;
            if (p1.sets > p2.sets)
                return -1;
            return 0;
        }
    }

    // shows playerRankings ordered by wins, difference between wins and losses and sets won last
    $("#playerRankings").on("click", function(e) {
        players.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (g = 0; g < players.length; g++) {
            players[g].diff = players[g].wins - players[g].losses;
        };
        players.sort(compareWins);
        players.sort(compareDiff);
        players.sort(compareSets);
        if ($("#rankings").html() === "") {
            var str = "";
            for (i = 0; i < players.length; i++) {
                str += "RANK: " + (i + 1) + "  NAME: " + players[i].name + "  WINS: " + players[i].wins + "  LOSSES: " +
                    players[i].losses + " SETS WON: " + players[i].sets + "<hr>";
                $("#rankings").html(str);
            }
        } else {
            $("#rankings").html("");
        }
    });

};
