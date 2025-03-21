Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportPoorPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-poor-popup',
	alias	: 'widget.lookup-poor-popup',

	title	: '불량조회',
	closable: true,
	autoShow: true,
	width	: 600,
	height	: 590,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createView()];
		me.callParent(arguments);

		//불량 조회
		var store = Ext.ComponentQuery.query('module-eisreport-poor')[0].getStore(),
			param = Ext.merge({ invc_numb : me.popup.params.invc_numb
			})
		;

		store.load({
			params : { param:JSON.stringify(
				param
			)},
			scope:this,
			callback:function(records, operation, success) {
				console.log(records);
			}
		});


	},

	createView: function(){
		var me = this, form =
		{
			xtype :'form-layout' ,
			region:'center',
			border:false,
			items : [ me.createForm() ]  //me.createToolbar(),

		};
		return form;
	},

	createForm: function(){
		var me = this,
			form = {
				xtype: 'form-panel',
				region: 'center',
				items			: [
					{	xtype : 'module-eisreport-poor', region:'center' , flex : 1, height:500 ,margin: '0 0 0 0', itemId : 'grid1'
					}
				],
				buttons: [
					{	text	: '<span class="btnTemp" style="font-size:2.5em">닫기</span>',
						cls		: 'button-style',
						flex	: 1,
						height	: 50,
						handler	: function() {
//							var poor  = me.down('[itemId=grid1]'),
//								store = poor.getStore(),
//								n = 0, request = []
//							;
//							store.each(function(record){
//								n = n + Number(record.get('poor_qntt'));
//							});
//
//							request.push({
//								qntt : Number(n)
//							});
							me.setResponse(request);

						}
					}
				]
			}
		;
		return form;
	},

});
