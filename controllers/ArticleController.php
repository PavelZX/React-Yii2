<?php

namespace app\controllers;
use yii\filters\Cors;

class ArticleController extends \yii\rest\ActiveController
{
    public function actions() {
        $actions = parent::actions();
        $actions['options'] = [
            'class' => 'yii\rest\OptionsAction',
        ];
        return $actions;
    }

    /**
     * @return array|array[]
     */
    public function behaviors(): array {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors'  => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*']
            ]
        ];

        return $behaviors;
    }

    public $modelClass = 'app\models\Article';

}
