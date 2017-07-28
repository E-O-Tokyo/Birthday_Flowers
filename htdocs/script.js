$(function () {

	addList();
	showIntroModal();
	onClickFlowerCard();

	function addList() {
		var imageBox = "";
		for (var day_i = 1; day_i <= 31; day_i++) {
			var imageDay = ('0' + day_i).slice(-2);
			var list = document.createElement("li");
			list.innerHTML = '<div class="image_box"><a class = "modal-syncer button-link-01" data-target="modal-content01' + imageDay + '" title=""><img src="img/resize/01' + imageDay + '_resize.jpg" alt="" class="image"></a><p class="date">' + imageDay + '</p></div>';
			var parentObject = document.getElementById("flowers-image");
			parentObject.appendChild(list);
		}
	}

	function showIntroModal() {
		$("body").append('<div id="modal-overlay"></div>');
		$("#modal-overlay").fadeIn("slow");

		// centeringModalSyncer(nowModalSyncer);

		$("#introduction_Modal").fadeIn("slow");

		$("#modal-overlay,#modal-close").unbind().click(function () {

			$("#introduction_Modal,#modal-overlay").fadeOut("slow", function () {
				//$('#modal-overlay').remove();
			});
		});
	}

	function onClickFlowerCard() {
		//////////////////////////// modal
		var nowModalSyncer = null;
		var modalClassSyncer = "modal-syncer";

		var modals = document.getElementsByClassName(modalClassSyncer);

		for (var i = 0, l = modals.length; i < l; i++) {

			modals[i].onclick = function () {


				// jsonから月とか花言葉取ってくる
				var dataTarget = $(this).attr("data-target");

				var day = Number(dataTarget.slice(-2)) - 1;
				var monthDay = (dataTarget.slice(-4));

				$.getJSON("test.json", function (data) {

					$(".words").html(data.items[day].name + "<br>" + data.items[day].word);
					$("#modal-image").attr("src", "img/modal-photo/modal-photo-" + monthDay + ".jpg");

					var metaOgDescription = document.head.children;
					var metaLength = metaOgDescription.length;
					for (var i = 0; i < metaLength; i++) {
						var proper = metaOgDescription[i].getAttribute('property');
						if (proper === 'og:description') {
							var dis = metaOgDescription[i];
							dis.setAttribute("content", data.items[day].name + "<br>" + data.items[day].word);
						}
					}
					var metaOgImage = document.head.children;
					var metaLength = metaOgImage.length;
					for (var i = 0; i < metaLength; i++) {
						var proper = metaOgImage[i].getAttribute("property");
						if (proper === 'og:image') {
							var img = metaOgImage[i];
							img.setAttribute("content", "img/modal-photo/modal-photo-" + monthDay + ".jpg");
						}
					}
				});

				var modalId = "modal-content";

				// data-targetが指定されてない場合
				if (typeof (modalId) == "undefined" || !modalId || modalId == null) {
					return false;
				}

				// モーダルの指定
				nowModalSyncer = document.getElementById(modalId);

				if (nowModalSyncer == null) {
					return false;
				}

				$("body").append('<div id="modal-overlay-01"></div>');

				// over layの表示
				$("#modal-overlay-01").fadeIn("fast");

				// モーダルの表示
				$(nowModalSyncer).fadeIn("slow");

				// モーダルを中心に寄せる
				// centeringModalSyncer(nowModalSyncer);

				// overlayと閉じるボタンを押した場合
				$("#modal-overlay-01,#modal-close-01").unbind().click(function () {
					// モーダルとオーバレイをフェードアウト
					$("#" + modalId + ",#modal-overlay-01").fadeOut("fast");
					nowModalSyncer = null;
				});
			}
		}
		// resize event
		$(window).resize(centeringModalSyncer);
	}

	function centeringModalSyncer(nowModalSyncer) {

		var win = document.defaultView;
		console.log(win);
		if (nowModalSyncer == null)
			return false;

		var w = $(window).width();
		var h = $(window).height();

		var cw = $(nowModalSyncer).outerWidth();
		var ch = $(nowModalSyncer).outerHeight();

		$(nowModalSyncer).css({
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
