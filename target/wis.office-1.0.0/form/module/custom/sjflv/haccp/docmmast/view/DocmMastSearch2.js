Ext.define('module.custom.sjflv.haccp.docmmast.view.DocmMastSearch2', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-docmmast-search2',
	
	 initComponent: function(){
		var me = this;
		me.items = [me.searchForm()];
		me.callParent();
	},
	
	searchForm: function() {
		var me = this,
			form = {
				xtype	: 'form-search',
				margin	: 0,
				items	: [
					{	xtype	: 'fieldset',
						items	: [
							{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	xtype	: 'label',
										text	: '결재명#1',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_1fst',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '작성담당자',
										xtype	: 'label',
										style : 'text-align:center;'
									},{	xtype		: 'popupfield',
										name		: 'apvl_drtr_name_1fst',
										pair		: 'apvl_drtr_idcd_1fst',
										editable	: true,
										enableKeyEvents : true,
										emptyText	: '',
										clearable	: false,
										popup		: {
											widget	: 'lookup-user-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	xtype	: 'textfield',
										name	: 'apvl_drtr_idcd_1fst',
										hidden	: true
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재명#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_2snd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재담당자#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'popupfield',
										name		: 'apvl_drtr_name_2snd',
										pair		: 'apvl_drtr_idcd_2snd',
										editable	: true,
										enableKeyEvents : true,
										emptyText	: '',
										clearable	: false,
										popup		: {
											widget	: 'lookup-user-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	xtype	: 'textfield',
										name	: 'apvl_drtr_idcd_2snd',
										hidden	: true
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재명#3',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_3trd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재담당자#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'popupfield',
										name		: 'apvl_drtr_name_3trd',
										pair		: 'apvl_drtr_idcd_3trd',
										editable	: true,
										enableKeyEvents : true,
										emptyText	: '',
										clearable	: false,
										popup		: {
											widget	: 'lookup-user-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
											}
										}
									},{	xtype	: 'textfield',
										name	: 'apvl_drtr_idcd_3trd',
										hidden	: true
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 250,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '비고',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'item_code',
										pair		: 'item_name',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
													me.appendItem({});
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							}
						]
					}
				]
			};
		
		return form;
	},
	
	appendItem : function (config) {
		var me		= this,
			store	= me.ownerCt.getStore(),
			seq		= me.ownerCt.editor.getSEQ();
		console.log('양식정보관리 store: ', store);
		record = Ext.create( store.model.modelName , {
			line_seqn: seq,
			apvl_name_1fst: me.down('[name=apvl_name_1fst]').getValue(),
			apvl_name_2snd: me.down('[name=apvl_name_2snd]').getValue(),
			apvl_name_3trd: me.down('[name=apvl_name_3trd]').getValue(),
			apvl_drtr_idcd_1fst: me.down('[name=apvl_drtr_idcd_1fst]').getValue(),
			apvl_drtr_idcd_2snd: me.down('[name=apvl_drtr_idcd_2snd]').getValue(),
			apvl_drtr_idcd_3trd: me.down('[name=apvl_drtr_idcd_3trd]').getValue(),
			apvl_drtr_name_1fst: me.down('[name=apvl_drtr_name_1fst]').getValue(),
			apvl_drtr_name_2snd: me.down('[name=apvl_drtr_name_2snd]').getValue(),
			apvl_drtr_name_3trd: me.down('[name=apvl_drtr_name_3trd]').getValue(),
		});
		store.add(record);
		me.getForm().reset();
	}

});