Ext.define('module.custom.sjflv.prod.prodplan.view.AddProdPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-sjflv-addprodplan-popup',

	title	: '공정품 추가 생산',
	closable: true,
	autoShow: true,
	width	: 670,
	height	: 170,
	layout	: {
		type: 'border'
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
	createForm: function(){
		var  me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems	: [ me.createToolBar() ],
				items		: [ me.createItem() ]
			}
		;
		return form;
	},
	
	createItem: function(){
		var me = this,
		form = {
			xtype	: 'form-panel',
			region	: 'center',
			layout	: 'vbox',
			defaults: { border: false, margin: 5 },
			items	: [
				{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'textfield',
							name		: 'item_code',
							fieldLabel	: '공정품코드',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_code')
						},{	xtype		: 'textfield',
							name		: 'item_name',
							fieldLabel	: '품명',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_name')
						},{	xtype		: 'textfield',
							name		: 'item_spec',
							fieldLabel	: '규격',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('item_spec')
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'numericfield',
							fieldLabel	: '재고수량',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('stok_qntt')
						},{	xtype		: 'numericfield',
							fieldLabel	: '과부족수량',
							name		: 'baln_qntt',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							value		: me.popup.params.get('baln_qntt')
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					items	: [
						{	xtype		: 'datefield',
							name		: 'deli_date',
							fieldLabel	: '납기일자',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
						},{	xtype		: 'numericfield',
							name		: 'invc_qntt',
							fieldLabel	: '추가생산량',
							fieldCls	: 'requiredindex',
							emptyText	: '필수입력',
							value		: 0,
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					hidden	: true,
					items	: [
						{	xtype		: 'textfield',
							name		: 'item_idcd',
							value		: me.popup.params.get('item_idcd')
						},{	xtype		: 'textfield',
							name		: 'unit_idcd',
							value		: me.popup.params.get('unit_idcd')
						},{	xtype		: 'datefield',
							name		: 'invc_date',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date(),
						},{	xtype		: 'numberfield',
							name		: 'amnd_degr',
							value		: 1
						},{	xtype		: 'numberfield',
							name		: 'line_seqn',
							value		: 1
						},{	xtype		: 'textfield',
							name		: 'acpt_dvcd',
							value		: '1000'
						},{	xtype		: 'textfield',
							name		: 'prod_trst_dvcd',
							value		: '2000'
						}
					]
				}
			]
		};
		return form	
	},
	
	createToolBar: function(){
		var me = this,
		toolBar = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
				'->',
				{ text: Const.FINISH.text, iconCls: Const.FINISH.icon, scope: me, handler: me.finishAction, cls: 'button-style' },
				'-',
				{ text: Const.CLOSER.text, iconCls: Const.CLOSER.icon, scope: me, handler: me.close , cls: 'button-style'}
			]
		};
		return toolBar;
	},

	finishAction: function(){
		var me = this,
		formData = me.down('form-panel').getValues();
		
		if (formData.invc_qntt <= 0 || formData.invc_qntt == undefined || formData.invc_qntt > formData.baln_qntt) {
			Ext.Msg.alert('알림', '추가 생산량은 0 이상이어야 하며, 과부족 수량 내에서만 입력 가능합니다.');
			return false;
		}
		if (formData.deli_date === "") {
			Ext.Msg.alert('알림', '납기일자를 입력해주세요.');
			return false;
		}
		
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'acpt_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				Ext.merge(formData, {invc_numb: result.records[0].seq, crte_idcd: _global.login_id});
				me.saveAcpt(formData);
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	},
	
	saveAcpt: function(data){
		var me = this;
		Ext.Ajax.request({
			url		: _global. location.http () + '/custom/sjflv/prod/prodplan/set/addprod.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON.stringify({
					records: [data]
				})
			},
			async	: false,
			success : function(response, request) {
				Ext.Msg.alert('알림', '추가생산 등록완료.');
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
				me.close();
			}
		});
	}
});
