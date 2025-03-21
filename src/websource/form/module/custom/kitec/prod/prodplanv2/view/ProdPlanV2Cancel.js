Ext.define('module.custom.kitec.prod.prodplanv2.view.ProdPlanV2Cancel', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodplanv2-cancel',

	title		: '주문 취소 접수' ,
	closable	: true,
	autoShow	: true,
	width		: 570,
	height		: 230,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me   = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
		me.down('form').loadRecord( me.popup.values ); // Values 들을 폼으로 불러옴
	},

	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this, form =
		{	xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{	xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{	xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close ,cls: 'button-style'}
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me = this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '10 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 250,
							fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							items : [
								{ fieldLabel : '주문 번호'		,	name : 'inv_no'		,	xtype	: 'textfield'	, allowBlank : false },
								{ fieldLabel : '취소 사유'		,	name : 'reason_nm'	,	xtype	: 'textarea'	, allowBlank : false },
							]
						},{	xtype		: 'form-panel',
							border		: 0,
							width		: 250,
							fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							items		: [
								{ fieldLabel : '환불 예정 금액'	,	name : 'reason_nm'		,	xtype : 'numericfield'	, allowBlank : false },
								{ fieldLabel : '환불 입금 계좌'	,	name : 'repmt_bank_no'	,	xtype : 'textfield'		, allowBlank : false },
								{ fieldLabel : '환불 입금 은행'	,	name : 'repmt_bank_nm'	,	xtype : 'textfield'		, allowBlank : false  }, //, value : me.popup.values.data.biz_no
								{ fieldLabel : '예금주'		,	name : 'repmt_bank_own'	,	xtype : 'textfield'		, allowBlank : false  },
								{ fieldLabel : '환불 요청 메모'	,	name : 'repmt_msg'		,	xtype : 'textarea'		, allowBlank : false }
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
		var me     = this,
			baseform   = me.down('form'),
			record = baseform.getRecord(),
			values = baseform.getValues()
		;

		if (!baseform.getForm().isValid() ){ // 뭔가 이슈가 있는경우
			Ext.Msg.alert('알림',  '형식에 맞게 입력해주세요' );
		} else {
			var mask = new Ext.LoadMask(me.getEl(), {msg: '주문 취소 중입니다.' });
			mask.show();
			setTimeout(function(){
				Ext.Ajax.request({
					url     : me.popup.apiurl.master ,  //me.apiurl.master ,
					params  : {
						token : _global.token_id,
						param : JSON.stringify( Ext.merge( me.popup.params, values  ))
					},
					method  : 'POST',
					success : function(response, request) {
						var result = Ext.decode(response.responseText);
						if (result.success){
							//record.set(values);
							Ext.Msg.alert('알림',  '주문 취소 완료 하였습니다.' );
							me.setResponse(values);
						} else {
							Ext.Msg.alert('알림',  result.message);
							return;
						}
					},
					failure : function(result, request) {
						Ext.Msg.alert('알림',  '주문 취소에 실패하였습니다.' );
					},
					callback : function() {
						mask.hide();
					}
				});
			},200);
		}
		return ;
	}
});
