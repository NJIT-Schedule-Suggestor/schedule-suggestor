<?php
/*!
 * Schedule builder
 *
 * Copyright (c) 2011, Edwin Choi
 *
 * Licensed under LGPL 3.0
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 */

$conn = new mysqli("localhost", "root", "Cs288005!", "scheduleSuggestor");

if (!$conn){
    echo "error";
}else{
    echo "connected\n";
}

?>
