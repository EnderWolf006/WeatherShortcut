import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.qweather.com', 'devapi.qweather.com', 'geoapi.qweather.com']);

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'datetime',
      label: t('label.fieldSelect.time'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.DateTime],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'apikey',
      label: t('label.input.key'),
      component: FieldComponent.Input,
      props: {
        placeholder: t('label.input.key.placeholder'),
      },
      tooltips:[
        {
          type:'text',
          content:'和风天气APIKey获取指南'
        },
        {
          type:'link',
          text:'点我跳转',
          link:'https://wingahead.feishu.cn/wiki/PlbbwrSGqiz0pIk3SQkc41gfnEd?from=from_copylink'
        }
      ] as any,
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
      },
      properties: [
        {
          key: 'weather',
          type: FieldType.Text,
          title: t('label.outField.weather'),
          isGroupByKey: true,
          primary: true,
        },
        {
          key: 'UV',
          type: FieldType.Number,
          title: t('label.outField.UV'),
        },
        {
          key: 'high',
          type: FieldType.Number,
          title: t('label.outField.high'),
          extra: {
            formatter: NumberFormatter.INTEGER,
          }
        },
        {
          key: 'low',
          type: FieldType.Number,
          title: t('label.outField.low'),
          extra: {
            formatter: NumberFormatter.INTEGER,
          }
        },
        {
          key: 'wind',
          type: FieldType.Text,
          title: t('label.outField.wind'),
        },
        {
          key: 'humidity',
          type: FieldType.Number,
          title: t('label.outField.humidity'),
          extra: {
            formatter: NumberFormatter.INTEGER,
          }
        },
        {
          key: 'sunrise',
          type: FieldType.Text,
          title: t('label.outField.sunrise'),
        },
        {
          key: 'sunset',
          type: FieldType.Text,
          title: t('label.outField.sunset'),
        }
      ],
    },
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: any, context) => {
    try {
      let { location, datetime = new Date().getTime(), apikey } = formItemParams;
      location = location[0].text
      if (!location) {
        throw new Error('查询地点为空')
      }
      const index = Math.floor((datetime - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (index < 0 || index >= 7) {
        throw new Error('只支持未来7天内')
      }
      let weatherAPIDomain = apikey ? 'api.qweather.com' : 'devapi.qweather.com';
      apikey = apikey || 'a009a7e44f234f4fa221403f16b68842';
      try {
        let geoapi = `https://geoapi.qweather.com/v2/city/lookup?key=${apikey}&number=1&location=${location}`;
        const locationId = (await (await context.fetch(geoapi, { method: 'GET' })).json()).location[0].id
        let weatherAPI = `https://${weatherAPIDomain}/v7/weather/7d?key=${apikey}&location=${locationId}&lang=zh`;
        const weather = (await (await context.fetch(weatherAPI, { method: 'GET' })).json()).daily[index];

        return {
          code: FieldCode.Success,
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
        }
      } catch (e) {
        return {
          code: FieldCode.Success,
          data: {
            weather: String(apikey == 'a009a7e44f234f4fa221403f16b68842' ? '免费共享额度用尽或APIKey无效': '额度用尽或APIKey无效'),
          },
        };
      }
    } catch (error) {
      return {
        code: FieldCode.Success,
        data: {
          weather: String(error)
        },
      };
    }
  },
});
export default basekit;