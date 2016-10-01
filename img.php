<?php
$destination = imagecreatetruecolor(512, 512);
$source = imagecreatefrompng("https://staticdelivery.nexusmods.com/mods/1151/images/3446-0-1448753594.png");;
$wasted = imagecreatefrompng("https://secure.gravatar.com/avatar/3121d605fb6bcc389945d20de7072944.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0024-512.png");
imagecopy($destination, $wasted, 0, 0, 0, 0, 512, 512);
imagecopy($destination, $source, -230, -150, 0, 0, 1000, 1000);
imagejpeg($destination, 'simpletext.jpg');
?>