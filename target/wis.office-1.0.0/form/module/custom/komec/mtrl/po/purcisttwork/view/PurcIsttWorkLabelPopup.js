Ext.define('module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkLabelPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcisttwork-label-popup',

	title		: '라벨재발행',
	closable	: true,
	autoShow	: true,
	width		: 200 ,
	height		: 110,
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
							width		: 370,
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '수주번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									itemId		: 'invc_numb',
									width		: 250,
									hidden		: true
								},{	fieldLabel	: '거래처명',
									name		: 'cstm_idcd',
									xtype		: 'textfield',
									itemId		: 'cstm_idcd',
									width		: 250,
									hidden		: true
								},{	fieldLabel	: '건너뛰기',
									name		: 'b_line',
									xtype		: 'numericfield',
									itemId		: 'b_line',
									value		: '0',
									width		: 180
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
			master	= Ext.ComponentQuery.query('module-purcisttwork-lister-master')[0],
			select  = master.getSelectionModel().getSelection()[0],
			record	= master.getSelectionModel().getSelection(),
			jrf		= 'komec_label.jrf',
			resId	= _global.hq_id.toUpperCase()
		;
		if(values.b_line==''||values.b_line==null){
			Ext.Msg.alert("알림","건너뛰려는 페이지수를 반드시 입력해주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('orig_invc_numb')+'\',\'line_seqn\':'+ record[i].get('line_seqn')+'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/mtrl/po/purcisttwork/get/report_kind.do',
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
					param : {
						b_line		: values.b_line,
						report_kind	: '1',
						records		: a,
					}
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
//					jrf = result.records[0].rprt_name;
				}
			},
		});
		me.setResponse( {success : true , values :  values });
		var _param = '_param~{\'b_line\':\''+values.b_line+'\',\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	}
});
