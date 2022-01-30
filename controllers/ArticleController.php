<?php

namespace app\controllers;


class ArticleController extends \yii\rest\ActiveController
{
    use CorsExt;

    public $modelClass = 'app\models\Article';

}
