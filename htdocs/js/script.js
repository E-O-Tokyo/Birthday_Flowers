$(function () {

	addFlowerCards();
	showIntroModal();
	onClickFlowerCard();

	function addFlowerCards() {
		var imageBox = "";
		var parentObject = document.getElementById("flowers-image");
		var monthDays = 31;
		for (var day_i = 1; day_i <= monthDays; day_i++) {
			var imageDay = ('0' + day_i).slice(-2);
			var list = document.createElement("li");
			list.innerHTML = '<div class="image_box"><a class = "flower-card button-link-01" data-target="card-content01' + imageDay + '" title=""><img src="img/resize/01' + imageDay + '_resize.jpg" alt="" class="image"></a><p class="date">' + imageDay + '</p></div>';
			parentObject.appendChild(list);
		}
	}

	function showIntroModal() {
		$("body").append('<div id="modal-overlay"></div>');
		$("#modal-overlay").fadeIn("slow");

		$("#introduction_Modal").fadeIn("slow");

		$("#modal-overlay,#modal-close").unbind().click(function () {

			$("#introduction_Modal,#modal-overlay").fadeOut("slow");
		});
	}

	function onClickFlowerCard() {
		//////////////////////////// modal
		var flowerCardModal = null;
		var cards = document.getElementsByClassName("flower-card");

		for (var i = 0, l = cards.length; i < l; i++) {

			cards[i].onclick = function () {


				// jsonから月とか花言葉取ってくる
				var dataTarget = $(this).attr("data-target");

				var day = Number(dataTarget.slice(-2)) - 1;
				var monthDay = (dataTarget.slice(-4));

				$.getJSON("test.json", function (data) {

					$(".words").html(data.items[day].name + "<br>" + data.items[day].word);
					$("#modal-image").attr("src", "img/modal-photo/modal-photo-" + monthDay + ".jpg");
				});

				var cardId = "card-content";


				// モーダルの指定
				flowerCardModal = document.getElementById(cardId);

				if (flowerCardModal == null) {
					return false;
				}

				$("body").append('<div id="modal-overlay-01"></div>');

				// over layの表示
				$("#modal-overlay-01").fadeIn("fast");

				// モーダルの表示
				$(flowerCardModal).fadeIn("slow");

				// overlayと閉じるボタンを押した場合
				$("#modal-overlay-01,#modal-close-01").unbind().click(function () {
					// モーダルとオーバレイをフェードアウト
					$("#" + cardId + ",#modal-overlay-01").fadeOut("fast");
					flowerCardModal = null;
				});
			}
		}
		// resize event
		$(window).resize(centeringModalSyncer);
	}

	function centeringModalSyncer(flowerCardModal) {

		var win = document.defaultView;
		console.log(win);
		if (flowerCardModal == null)
			return false;

		var w = $(window).width();
		var h = $(window).height();

		var cw = $(flowerCardModal).outerWidth();
		var ch = $(flowerCardModal).outerHeight();

		$(flowerCardModal).css({
			"left": ((w - cw) / 2) + "px",
			"top": ((h - ch) / 2) + "px"
		});

		var windowWidth1 = window.innerWidth;
		var rS1 = windowWidth1 / 2;
	}

	$.getJSON("test.json", function (data) {
		$("#month").html(data.month);
	});
});
