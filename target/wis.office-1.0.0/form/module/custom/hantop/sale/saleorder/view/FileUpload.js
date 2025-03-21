/**
 * 파일 업로드 공통 팝업
 */
Ext.define('module.custom.hantop.sale.saleorder.view.FileUpload', { extend: 'Axt.popup.Upload',

	alias: 'widget.module-saleorder-upload',

	title: '업로드',
	closable: true,
	autoShow: true,
	width: 450,
	height: 200,
	layout: {
		type: 'border'
	},

	/**
	 * 허용되는 확장자
	 */
	allowExtension : [],

	/**
	 * 서버전송한 URL
	 */
	// url : '',

	/**
	 * 서버에 전송중일때 뜨는 progressbar의 메시지
	 */
	waitMsg : Const.INSERT.mask,

	/**
	 * fieldField의 config
	 */
	fileFieldConfig: {},

	/**
	 * upload 전송 버튼 config
	 */
	uploadBtnConfig : {},

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		me.allowExtension = me.allowExtension.concat( me.popup.option.extension );
		me.items = [me.createForm()];

		me.callParent(arguments);
	},

	createForm: function(){
		var me = this,
		form = {
			xtype      : 'form-panel',
			region     : 'center',
			border     :  false,
			dockedItems: [
			{
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					Ext.isEmpty(me.popup.sample) ? {} : me.popup.sample , '->' ,
							{xtype: 'button' , text : 'Upload' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
							{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style' }
						]
					}
				],
			items : [ me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this
		if (Ext.isEmpty(me.popup.apiurl.upload)) {
			if(Ext.isEmpty(me.popup.apiurl.master)) {
				Ext.Msg.alert('', 'url이 설정되지 않았습니다.');
				return;
			} else {
				me.popup.apiurl.upload = me.popup.apiurl.master ;
			}
		}

		if(Ext.isEmpty(me.popup.apiurl.upload)) {
			Ext.Msg.alert('', 'url이 설정되지 않았습니다.');
			return;
		}
		var form = {
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: { type: 'vbox', align: 'stretch'} ,
			items	: [
				{
					xtype 	: 'form-panel',
					name 	: 'uploadForm',
					region  : 'center',
					standardSubmit: false,
					border	:  false,
					url 	: me.popup.apiurl.upload,
					timeout : 120000,
					method	: 'POST',
					layout	: { type: 'vbox', align: 'stretch' } ,
					padding : 10 ,
					renderTo: Ext.getBody(),
					items	: [
						Ext.merge({
							xtype  : 'label',
							text   : 'Upload File 선택' ,
							margin : '0 0 5 0'
						}, me.popup.option.labelConfig),
						Ext.merge({
							xtype 		: 'filefield',
							name 		: 'files',
							msgTarget 	: 'side',
							allowBlank 	: false,
							anchor 		: '100%',
							width       : 350,
							buttonText 	: '선택',
							regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i') // 확장자 제한 정규식
						}, me.popup.option.fileConfig),
						{xtype:'hiddenfield', name:'param', value:'' },
						{xtype:'hiddenfield', name:'token', value:_global.token_id }
					]
				}
			]
		};
		return form;
	},

	sampleAction : function () {

	},
	/**
	 * @private
	 * 직인이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction : function (button) {
		var me = this
		baseform= me.down('form'),
		values	= baseform.getValues()
		;
		var param = {};
		param.stor_gp  = _global.stor_gp;
		param.stor_id = _global.stor_id;


		Ext.merge(param, me.params);
		// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span>할 파일형식을 확인해 주십시오.<br/><span style="color:blue">['+ me.allowExtension.join(', ') +']</span>만 업로드 가능합니다.');
			return;
		}

		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});

		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				var result = Ext.decode(action.response.responseText)
					records = result.records
				;
				if (result.success && records) {
					me.setResponse(records);
				} else {
					me.setResponse([]); // 원래 소스들이 리절트 값이 없어 이렇게 처리함
				}
			},
			failure: function(form, action) {
				var result = Ext.decode(action.response.responseText);
				Ext.Msg.show({ msg: result.message , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				me.close();
			}
		});
	}
});
