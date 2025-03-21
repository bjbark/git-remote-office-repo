Ext.define('module.prod.order.otodwork.view.OtodWorkIsttPartPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-otodwork-isttpart-popup'			,

	title: '부분입고',

	closable: true,
	autoShow: true,
	width: 210,
	height: 105,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }

		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	createForm: function(){
		var me = this, form =
		{
			xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	:
			[
				{
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	:
					[
						'->' ,
						{xtype : 'button' , text : '<span style="color:white">확인</span>' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype : 'button' , text : '<span style="color:white">닫기</span>'  , iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
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
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: 'vbox',
			defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '10 0 5 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 180, labelWidth : 60, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset', layout: 'hbox',
					items	:
					[
						{	fieldLabel	: Language.get('qntt','입고수량'),
							xtype		: 'numericfield',
							name		: 'qntt',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				}
			]
		}
		return form;
	},

	/**
	 *
	 */
	finishAction : function (button) {
		var	me = this,
			master  = Ext.ComponentQuery.query('module-otodwork-lister-master')[0].getStore(),
			detail  = Ext.ComponentQuery.query('module-otodwork-lister-detail')[0].getStore(),
			qntt    = me.down('[name=qntt]').getValue(),
			records = me.popup.params.records,
			new_invc_numb = '',chk = '0'
		;

		if(qntt != '' && qntt != null && qntt <= (records.get('offr_qntt')-records.get('istt_qntt'))){
			if(records.get('offr_qntt')<qntt){
				Ext.Msg.alert('알림','입고수량은 발주수량을 초과할 수 없습니다.');
			}else{
				if(qntt == (records.get('offr_qntt')-records.get('istt_qntt'))){
					chk = 1;
				}
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'work_book'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/prod/project/otodwork/set/istt_part.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb		: records.get('invc_numb'),
							line_seqn		: records.get('line_seqn'),
							orig_invc_numb	: records.get('orig_invc_numb'),
							orig_seqn		: records.get('orig_seqn'),
							item_idcd		: records.get('item_idcd'),
							offr_qntt		: records.get('offr_qntt'),
							wkct_idcd		: records.get('wkct_idcd'),
							wker_idcd		: _global.login_pk ,
							new_invc_numb	: new_invc_numb,
							qntt			: qntt,
							chk				: chk,
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						me.close();
						master.reload();
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
					}
				});
			}
		}else{
			Ext.Msg.alert("알림", "입고수량을 입력하여 주십시오.");
		}
	}
});