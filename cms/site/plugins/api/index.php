<?php
Kirby::plugin('my/api', [
  'api' => [
    'routes' => [
        [
          'method' => 'GET',
          'pattern' => 'info-page',
          'action'  => function () {
            return "info";
          }
        ]
     ]
  ]
]);