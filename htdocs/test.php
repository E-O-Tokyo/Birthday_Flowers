<?php
  $min = 1;
  $max = 100;
if (isset($_GET['photo']) && is_numeric($_GET['photo']) && $_GET['photo'] >= $min && $_GET['photo'] <= $max) {
  $photo = sprintf('%03d', floor($_GET['photo']));
?>
<meta property="og:image" content="http://webcyou.com/demo/facebook/photolike/img/img_<?php echo $photo ?>.jpg">
<?php }else{ ?>
<meta property="og:image" content="http://webcyou.com/demo/facebook/photolike/img/img_000.jpg">
<?php } ?>
