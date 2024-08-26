"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['api.qweather.com', 'devapi.qweather.com', 'geoapi.qweather.com']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'label.fieldSelect.position': '请选择位置所在字段',
                'label.fieldSelect.time': '请选择日期时间所在字段',
                'label.input.key': '请输入APIKey',
                'label.input.key.placeholder': '请输入和风天气APIKey（若选择免费版则留空）',
                'label.outField.weather': '天气文字描述（如阴晴雨雪）',
                'label.outField.UV': '紫外线强度',
                'label.outField.high': '当天最高温度（摄氏度）',
                'label.outField.low': '当天最低温度（摄氏度）',
                'label.outField.wind': '风力等级',
                'label.outField.humidity': '相对湿度',
                'label.outField.sunrise': '日出时间',
                'label.outField.sunset': '日落时间',
            },
            'en-US': {
                'label.fieldSelect.position': 'Please select the location field',
                'label.fieldSelect.time': 'Please select the datetime field',
                'label.input.key': 'Please enter the APIKey',
                'label.input.key.placeholder': 'Please enter the APIKey (if you choose free version, leave it blank)',
                'label.outField.weather': 'Weather text description (e.g. rain, snow, etc.)',
                'label.outField.UV': 'UV',
                'label.outField.high': 'Highest temperature (°C)',
                'label.outField.low': 'Lowest temperature (°C)',
                'label.outField.wind': 'Wind power level',
                'label.outField.humidity': 'Relative humidity',
                'label.outField.sunrise': 'Sunrise time',
                'label.outField.sunset': 'Sunset time',
            },
            'ja-JP': {
                'label.fieldSelect.position': 'ポジションを選択してください',
                'label.fieldSelect.time': '日付と時間を選択してください',
                'label.input.key': 'APIKeyを入力してください',
                'label.input.key.placeholder': 'APIKeyを入力してください（無料版の場合は空欄）',
                'label.outField.weather': '天気の文字説明（例えば雨雪など）',
                'label.outField.UV': '紫外線強度',
                'label.outField.high': '最高気温（°C）',
                'label.outField.low': '最低気温（°C）',
                'label.outField.wind': '風力レベル',
                'label.outField.humidity': '相対湿度',
                'label.outField.sunrise': '日出時間',
                'label.outField.sunset': '日没時間',
            },
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'location',
            label: t('label.fieldSelect.position'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'datetime',
            label: t('label.fieldSelect.time'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'apikey',
            label: t('label.input.key'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('label.input.key.placeholder'),
            },
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
            },
            properties: [
                {
                    key: 'weather',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('label.outField.weather'),
                    isGroupByKey: true,
                    primary: true,
                },
                {
                    key: 'UV',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('label.outField.UV'),
                },
                {
                    key: 'high',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('label.outField.high'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.INTEGER,
                    }
                },
                {
                    key: 'low',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('label.outField.low'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.INTEGER,
                    }
                },
                {
                    key: 'wind',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('label.outField.wind'),
                },
                {
                    key: 'humidity',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('label.outField.humidity'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.INTEGER,
                    }
                },
                {
                    key: 'sunrise',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('label.outField.sunrise'),
                },
                {
                    key: 'sunset',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('label.outField.sunset'),
                },
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        try {
            let { location, datetime = new Date().getTime(), apikey } = formItemParams;
            location = location[0].text;
            if (!location) {
                return {
                    code: block_basekit_server_api_1.FieldCode.InvalidArgument,
                };
            }
            const index = Math.floor((datetime - new Date().getTime()) / (1000 * 60 * 60 * 24));
            if (index < 0 || index >= 7) {
                return {
                    code: block_basekit_server_api_1.FieldCode.InvalidArgument,
                };
            }
            let weatherAPIDomain = apikey ? 'api.qweather.com' : 'devapi.qweather.com';
            apikey = apikey || 'a009a7e44f234f4fa221403f16b68842';
            let geoapi = `https://geoapi.qweather.com/v2/city/lookup?key=${apikey}&number=1&location=${location}`;
            const locationId = (await (await context.fetch(geoapi, { method: 'GET' })).json()).location[0].id;
            let weatherAPI = `https://${weatherAPIDomain}/v7/weather/7d?key=${apikey}&location=${locationId}&lang=zh`;
            const weather = (await (await context.fetch(weatherAPI, { method: 'GET' })).json()).daily[index];
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    weather: weather.textDay,
                    UV: Number(weather.uvIndex),
                    high: Number(weather.tempMax),
                    low: Number(weather.tempMin),
                    wind: weather.windScaleDay + '级',
                    humidity: Number(weather.humidity),
                    sunrise: weather.sunrise,
                    sunset: weather.sunset,
                }
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBRTFGLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCw0QkFBNEIsRUFBRSxXQUFXO2dCQUN6Qyx3QkFBd0IsRUFBRSxhQUFhO2dCQUN2QyxpQkFBaUIsRUFBRSxXQUFXO2dCQUM5Qiw2QkFBNkIsRUFBRSwwQkFBMEI7Z0JBQ3pELHdCQUF3QixFQUFFLGVBQWU7Z0JBQ3pDLG1CQUFtQixFQUFFLE9BQU87Z0JBQzVCLHFCQUFxQixFQUFFLGFBQWE7Z0JBQ3BDLG9CQUFvQixFQUFFLGFBQWE7Z0JBQ25DLHFCQUFxQixFQUFFLE1BQU07Z0JBQzdCLHlCQUF5QixFQUFFLE1BQU07Z0JBQ2pDLHdCQUF3QixFQUFFLE1BQU07Z0JBQ2hDLHVCQUF1QixFQUFFLE1BQU07YUFDaEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNEJBQTRCLEVBQUUsa0NBQWtDO2dCQUNoRSx3QkFBd0IsRUFBRSxrQ0FBa0M7Z0JBQzVELGlCQUFpQixFQUFFLHlCQUF5QjtnQkFDNUMsNkJBQTZCLEVBQUUsc0VBQXNFO2dCQUNyRyx3QkFBd0IsRUFBRSxrREFBa0Q7Z0JBQzVFLG1CQUFtQixFQUFFLElBQUk7Z0JBQ3pCLHFCQUFxQixFQUFFLDBCQUEwQjtnQkFDakQsb0JBQW9CLEVBQUUseUJBQXlCO2dCQUMvQyxxQkFBcUIsRUFBRSxrQkFBa0I7Z0JBQ3pDLHlCQUF5QixFQUFFLG1C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