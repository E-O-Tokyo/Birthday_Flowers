$(function () {

	addList();
	showIntroModal();
	onClickFlowerCard();

	function addList() {
		var imageBox = "";
		for (var day_i = 1; day_i <= 31; day_i++) {
			var imageDay = ('0' + day_i).slice(-2);
			console.log(imageDay);
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
	console.log("ok");

	function onClickFlowerCard() {
		//////////////////////////// modal
		var nowModalSyncer = null;
		var modalClassSyncer = "modal-syncer";

		var modals = document.getElementsByClassName(modalClassSyncer);
		console.log(modals.length);
		//ここまで OK
		for (var i = 0, l = modals.length; i < l; i++) {
			//ここから ダメ
			modals[i].onclick = function () {

				// jsonから月とか花言葉取ってくる
				var dataTarget = $(this).attr("data-target");

				var day = Number(dataTarget.slice(-2)) - 1;
				var monthDay = (dataTarget.slice(-4));
				console.log(monthDay);

				$.getJSON("test.json", function (data) {
					console.log(data.month);

					$(".words").html(data.items[day].name + "<br>" + data.items[day].word);
					$("#modal-image").attr("src", "img/modal-photo/modal-photo-" + monthDay + ".jpg");
					console.log(data.items[day]);

					var metaOgDescription = document.head.children;
					var metaLength = metaOgDescription.length;
					for (var i = 0; i < metaLength; i++) {
						var proper = metaOgDescription[i].getAttribute('property');
						if (proper === 'og:description') {
							var dis = metaOgDescription[i];
							dis.setAttribute("content", data.items[day].name + "<br>" + data.items[day].word);
							console.log(dis);
						}
					}
					var metaOgImage = document.head.children;
					var metaLength = metaOgImage.length;
					for (var i = 0; i < metaLength; i++) {
						var proper = metaOgImage[i].getAttribute("property");
						if (proper === 'og:image') {
							var img = metaOgImage[i];
							img.setAttribute("content", "img/modal-photo/modal-photo-" + monthDay + ".jpg");
							console.log(img);
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
				console.log(nowModalSyncer);

				if (nowModalSyncer == null) {
					return false;
				}

				$("body").append('<div id="modal-overlay-01"></div>');

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
		console.log(format);
	}

	$.getJSON("test.json", function (data) {
		console.log(data.month);

		$("#month").html(data.month);

		console.log(document.head.children[7]);
		console.log(document.head.childNodes[5]);
	});

	$("#box").scroll(function () {
		console.log("scroooolllllll");
		// div要素内でスクロールされた時に実行する処理
	});
});
