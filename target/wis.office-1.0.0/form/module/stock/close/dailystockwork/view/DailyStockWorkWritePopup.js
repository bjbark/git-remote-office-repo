Ext.define('module.stock.close.dailystockwork.view.DailyStockWorkWritePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-dailystockwork-write-popup',

	title		: '재고현황 작성',
	closable	: true,
	autoShow	: true,
	width		: 400 ,
	height		: 150,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : '<span class="btnTemp" style="font-size:1.5em;">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style',width: 100, height : 35},'-',
						{ xtype: 'button' , text : '<span class="btnTemp" style="font-size:1.5em;">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style',width: 100, height : 35 }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 500,
							fieldDefaults: { width : 350, height : 35,labelWidth : 120, labelSeparator : ''},
							items		: [
								{	fieldLabel	: '작성일자',
									xtype		: 'datefield',
									name		: 'invc_date',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date(),
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								},{	fieldLabel	: Language.get('wkct_idcd','공정'),
									xtype		: 'textfield',
									name		: 'wkct_idcd',
									itemId		: 'wkct_idcd',
									margin		: '0 20 0 0' ,
									labelWidth	: 80,
									width		: 150,
									hidden		: true
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-dailystockwork-lister')[0]
		;
		if(values.invc_date==''||values.invc_date==null){
			Ext.Msg.alert("알림","작성일자를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/stock/close/dailystockwork/set/write.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						wkct_idcd	: this.popup.param.wkct_idcd,
						invc_date	: values.invc_date
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "재고현황 작성이 완료 되었습니다.");
					master.getStore().reload();
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						me.setResponse( {success : true , values :  values });
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
				}
			});
		}
	}
});
