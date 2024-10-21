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
                'label.input.key.placeholder': '请输入和风天气APIKey（若选择免费版请留空）',
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
            tooltips: [
                {
                    type: 'text',
                    content: '和风天气APIKey获取指南'
                },
                {
                    type: 'link',
                    text: '点我跳转',
                    link: 'https://wingahead.feishu.cn/wiki/PlbbwrSGqiz0pIk3SQkc41gfnEd?from=from_copylink'
                }
            ],
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
                }
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        try {
            let { location, datetime = new Date().getTime(), apikey } = formItemParams;
            location = location[0].text;
            if (!location) {
                throw new Error('查询地点为空');
            }
            const index = Math.floor((datetime - new Date().getTime()) / (1000 * 60 * 60 * 24));
            if (index < 0 || index >= 7) {
                throw new Error('只支持未来7天内');
            }
            let weatherAPIDomain = apikey ? 'api.qweather.com' : 'devapi.qweather.com';
            apikey = apikey || 'a009a7e44f234f4fa221403f16b68842';
            try {
                let geoapi = `https://geoapi.qweather.com/v2/city/lookup?key=${apikey}&number=1&location=${location}`;
                const locationId = (await (await context.fetch(geoapi, { method: 'GET' })).json()).location[0].id;
                let weatherAPI = `https://${weatherAPIDomain}/v7/weather/7d?key=${apikey}&location=${locationId}&lang=zh`;
                const weather = (await (await context.fetch(weatherAPI, { method: 'GET' })).json()).daily[index];
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: {
                        weather: weather.textDay ?? 'Error',
                        UV: Number(weather.uvIndex),
                        high: Number(weather.tempMax),
                        low: Number(weather.tempMin),
                        wind: weather.windScaleDay + '级',
                        humidity: Number(weather.humidity),
                        sunrise: weather.sunrise,
                        sunset: weather.sunset,
                        error: '',
                    }
                };
            }
            catch (e) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: {
                        weather: String(apikey == 'a009a7e44f234f4fa221403f16b68842' ? '免费共享额度用尽或APIKey无效' : '额度用尽或APIKey无效'),
                    },
                };
            }
        }
        catch (error) {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    weather: String(error)
                },
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBRTFGLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCw0QkFBNEIsRUFBRSxXQUFXO2dCQUN6Qyx3QkFBd0IsRUFBRSxhQUFhO2dCQUN2QyxpQkFBaUIsRUFBRSxXQUFXO2dCQUM5Qiw2QkFBNkIsRUFBRSwwQkFBMEI7Z0JBQ3pELHdCQUF3QixFQUFFLGVBQWU7Z0JBQ3pDLG1CQUFtQixFQUFFLE9BQU87Z0JBQzVCLHFCQUFxQixFQUFFLGFBQWE7Z0JBQ3BDLG9CQUFvQixFQUFFLGFBQWE7Z0JBQ25DLHFCQUFxQixFQUFFLE1BQU07Z0JBQzdCLHlCQUF5QixFQUFFLE1BQU07Z0JBQ2pDLHdCQUF3QixFQUFFLE1BQU07Z0JBQ2hDLHVCQUF1QixFQUFFLE1BQU07YUFDaEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNEJBQTRCLEVBQUUsa0NBQWtDO2dCQUNoRSx3QkFBd0IsRUFBRSxrQ0FBa0M7Z0JBQzVELGlCQUFpQixFQUFFLHlCQUF5QjtnQkFDNUMsNkJBQTZCLEVBQUUsc0VBQXNFO2dCQUNyRyx3QkFBd0IsRUFBRSxrREFBa0Q7Z0JBQzVFLG1CQUFtQixFQUFFLElBQUk7Z0JBQ3pCLHFCQUFxQixFQUFFLDBCQUEwQjtnQkFDakQsb0JBQW9CLEVBQUUseUJBQXlCO2dCQUMvQyxxQkFBcUIsRUFBRSxrQkFBa0I7Z0JBQ3pDLHlCQUF5QixFQUFFLG1C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