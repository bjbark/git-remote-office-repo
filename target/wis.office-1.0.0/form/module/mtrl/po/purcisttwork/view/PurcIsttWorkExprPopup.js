Ext.define('module.mtrl.po.purcisttwork.view.PurcIsttWorkExprPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcisttwork-expr-popup',

	title		: '유통기한 처리',
	closable	: true,
	autoShow	: true,
	width		: 500,
	height		: 200,
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
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items 		: [me.editorForm() ],
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('lott_numb','Batch No'),
							xtype		: 'textfield',
							name		: 'lott_numb',
							value		: me.param.lott_numb,
							width		: 200,
							labelWidth	: 60,
							readOnly	: true,
							fieldCls	: 'requiredindex',
						},{	fieldLabel	: Language.get('proc_date','처리일자'),
							xtype		: 'datefield',
							name		: 'proc_date',
							value		: me.param.proc_date,
							width		: 200,
							labelWidth	: 60,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('work_cont', '작업내용' ),
							xtype		: 'textfield',
							name		: 'work_cont',
							value		: me.param.work_cont,
							width		: 400,
							labelWidth	: 60,
						},{	name: 'invc_numb' , dataIndex: 'invc_numb' , xtype: 'textfield' , value : me.param.invc_numb , hidden : true
						},{	name: 'line_seqn' ,	dataIndex: 'line_seqn' , xtype: 'textfield' , value : me.param.line_seqn , hidden : true
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
			values	= baseform.getValues(),
			grid	= Ext.ComponentQuery.query('module-purcisttwork-expr-master')[0],
			store	= grid.getStore()
		;
		var lott_numb = values.lott_numb,
			proc_date = values.proc_date,
			work_cont = values.work_cont,
			invc_numb = values.invc_numb,
			line_seqn = values.line_seqn,
			login_id  = _global.login_id

		Ext.Ajax.request({
			url		: _global.location.http() + '/mtrl/po/purcisttwork/set/exprdata.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb	: values.invc_numb,
					line_seqn	: values.line_seqn,
					lott_numb	: values.lott_numb,
					proc_date	: values.proc_date,
					work_cont	: values.work_cont,
					login_id	: login_id
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {

					store.load({
						scope		: me,
						callback	: function(records, operation, success) {
						}
					});

					me.setResponse( {success : true , values :  values });

				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});