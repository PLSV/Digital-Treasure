<?php
require_once 'whatsprot.class.php';
$username = "918197529356"; //Mobile Phone prefixed with country code so for india it will be 91xxxxxxxx
$password = "5ifjA6OVkVe+fk7pWLWwNBHYRU8=";
 
$w = new WhatsProt($username, 0, "Event Announcement", true); //Name your application by replacing "WhatsApp Messaging"
$w->connect();
$w->loginWithPassword($password);
 
$target = '919880354647'; //Target Phone,reciever phone
$message = 'Hey Dad, Pavan here...call me if you get this message';
 
$w->SendPresenceSubscription($target); //Let us first send presence to user
$w->sendMessage($target,$message ); // Send Message
?>