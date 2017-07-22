$(function () {

	showIntroModal();
	onClickFlowerCard();

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
				var monthDay = dataTarget.slice(-4);
				console.log(monthDay);

				$.getJSON("test.json", function (data) {
					console.log(data.month);

					$("#flowers").text(data.month);
					$(".words").html(data.items[day].name + "<br>" + data.items[day].word);
					$("#modal-image").attr("src", "img/modal-photo/modal-photo-" + monthDay + ".jpg")
					console.log(data.items[day]);
				});

				var modalId = "modal-content";

				// data-targetが指定されてない場合
				if (typeof (modalId) == "undefined" || !modalId || modalId == null) {
					return false;
				}

				// モーダルの指定
				nowModalSyncer = document.getElementById(modalId);
				console.log(nowModalSyncer);

				if (nowModalSyncer == null) {
					return false;
				}

				// $("body").append('<div id="modal-overlay-01"></div>');

				// over layの表示
				$("#modal-overlay-01").fadeIn("fast");

				// モーダルの表示
				$(nowModalSyncer).fadeIn("slow");

				// モーダルを中心に寄せる
				centeringModalSyncer(nowModalSyncer);

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
	}

	window.onload = function exec() {
		var date = new Date();

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();

		month = ('0' + month).slice(-2);
		day = ('0' + day).slice(-2);

		format = 'YYYY-MM-DD';
		format = format.replace(/YYYY/g, year);
		format = format.replace(/MM/g, month);
		format = format.replace(/DD/g, day);

		target = document.getElementById("timeframe");
		target.innerHTML = format;
	}
});
