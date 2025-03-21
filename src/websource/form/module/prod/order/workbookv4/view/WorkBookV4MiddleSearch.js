Ext.define('module.prod.order.workbookv4.view.WorkBookV4MiddleSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbookv4-middlesearch',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items =[ me.createLine1()];
		me.callParent();
	},
	listeners:{
		destroy: function(element) {
			clearInterval(window.minInterval);
		},
	}
	,
	createLine1 : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 50
				,margin	: '20 40 13 10'
				,items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '지시수량',
								xtype		: 'numericfield',
								name		: 'indn_qntt',
								width		: 230,
								maxWidth	: 500,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},{	fieldLabel	: '이론수량',
								xtype		: 'numericfield',
								name		: 'runn_shot',
								width		: 230,
								maxWidth	: 500,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},{	fieldLabel	: '총 생산량',
								xtype		: 'numericfield',
								name		: 'sum_qntt',
								width		: 240,
								maxWidth	: 500,
								labelWidth	: 110,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},{	fieldLabel	: '생산 잔량',
								xtype		: 'numericfield',
								name		: 'deff_qntt',
								width		: 240,
								maxWidth	: 500,
								labelWidth	: 110,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},{	fieldLabel	: '달성율',
								xtype		: 'numericfield',
								name		: 'succ_pcnt',
								width		: 230,
								maxWidth	: 500,
								labelWidth	: 100,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							},
						]
					}
				]
			}
		;
		return line;
	},
	midSearch:function(invc_numb,line_seqn){
		var me = this;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv4/get/midsearch.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp,
					invc_numb	: invc_numb,
					line_seqn	: line_seqn,
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					var succ_pcnt = (result.records[0].sum_qntt/result.records[0].indn_qntt)*100;

					var param={};
					me.down('[name=indn_qntt]').setValue(result.records[0].indn_qntt);
					me.down('[name=runn_shot]').setValue(result.records[0].runn_shot);
					me.down('[name=sum_qntt]').setValue(result.records[0].sum_qntt);
					me.down('[name=deff_qntt]').setValue(result.records[0].deff_qntt);
					me.down('[name=succ_pcnt]').setValue(Number(succ_pcnt).toFixed(2));
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	}
});