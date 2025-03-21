Ext.define('module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2PrintPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-iypkg-saleostt2-print-popup',

	title		: '거래명세서 출력',
	closable	: true,
	autoShow	: true,
	width		: 280 ,
	height		: 130,
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
			items : [me.editorForm() ]
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
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '단가',
									name		: 'pric',
									xtype		: 'lookupfield',
									width		: 180,
									margin		: '20 0 0 20',
									lookupValue : resource.lookup('yorn'),
									value		: '1',
									editable	: false,
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			lister = Ext.ComponentQuery.query('module-saleostt2-lister')[0],
			record = lister.getSelectionModel().getSelection(),
			resId = _global.hq_id.toUpperCase(),
			params = me.popup.params
		;
		if(_global.hqof_idcd.toUpperCase()=='N1000DAE-A'){
			jrf = 'Invoice_dae-a.jrf';
		}else if(_global.hqof_idcd.toUpperCase()=='N1000LIEBE'){
			jrf = 'Invoice_liebe.jrf';
		}else if(_global.hqof_idcd.toUpperCase()=='N1000IYPKG'){
			jrf = 'Invoice_iypkg3.jrf';
		}

		if(values.pric == 1){
			dvcd = '1'
		}else{
			dvcd = '2'
		}

		var	a = "";
		if(params.chk == 1){
			var rec = params.rec;
			for(var i =0; i< rec.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+rec[i].get('new_invc_numb')+'\',\'line_seqn\':'+ rec[i].get('new_line_seqn')+'}';
				if(i != rec.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}else{
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':'+ record[i].get('line_seqn')+'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}
		var _param = '_param~{\'dvcd\':\''+dvcd+'\',\'records\':'+a+'}~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+_param+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/stock/isos/saleostt2/set/updt.do',
			method		: "POST",
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
						records	: a,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				lister.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){
			}
		});
		me.close();
		return win;
	}
});
