<?php

/**
 * The config file is optional. It accepts a return array with config options
 * Note: Never include more than one return statement, all options go within this single return array
 * In this example, we set debugging to true, so that errors are displayed onscreen. 
 * This setting must be set to false in production.
 * ----- IMPORTANT, allowInsecure allows non https connections to make API request. In production the server requires https.
 * set allowInsecure connections to true / or remove it for production
 * All config options: https://getkirby.com/docs/reference/system/options
 */
return [
    'debug' => true,
    'api' => [
        'basicAuth' => true,
        'allowInsecure' => true
    ]
];
