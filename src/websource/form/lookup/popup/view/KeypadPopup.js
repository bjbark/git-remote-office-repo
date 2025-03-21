/**
 */
Ext.define('lookup.popup.view.KeypadPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-keypad-popup',
	alias	: 'widget.lookup-keypad-popup',

	title	: Language.get('keypad','키패드'),
	closable: true,
	autoShow: true,
	width	: 420,
	height	: 460,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createView()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
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
					{	name		: 'result',
						xtype		: 'textfield',
						readOnly	: false,
						width		: 400,
						height		: 70,
						value		: me.popup.params.value?me.popup.params.value:'',
						fieldStyle	: 'font-size:3em !important; text-align : right;',

					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: '1',
								flex		: 1,
								height		: 50,
								cls			: 'number_1',
								border		: 0,
								margin		: '5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '2',
								cls			: 'number_2',
								flex		: 1,
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '3',
								cls			: 'number_3',
								flex		: 1,
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: '4',
								cls			: 'number_4',
								flex		: 1,
								border		: 0,
								height		: 50,
								margin		: '5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '5',
								cls			: 'number_5',
								flex		: 1,
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '6',
								cls			: 'number_6',
								flex		: 1,
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: '7',
								cls			: 'number_7',
								border		: 0,
								flex		: 1,
								height		: 50,
								margin		: '5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '8',
								border		: 0,
								cls			: 'number_8',
								flex		: 1,
								margin		: '5',
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '9',
								cls			: 'number_9',
								flex		: 1,
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: '.',
								flex		: 1,
								margin		: '5',
								border		: 0,
								cls			: 'dot',
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '0',
								cls			: 'number_0',
								flex		: 1,
								border		: 0,
								height		: 50,
								margin		: '5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: 'clear',
								flex		: 1,
								border		: 0,
								height		: 50,
								margin		: '5',
								cls			: 'button_clear',
								listeners:{
									click:function(field){
										me.clickButton(field.cls,field);
									}
								}
//							},{	xtype		: 'button',
//								text		: ':',
//								name		: 'right',
//								flex		: 1,
//								margin		: '5',
//								height		: 50,
//								listeners:{
//									click:function(field){
//										me.clickButton(field.text,field);
//									}
//								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: 'enter',
								cls			: 'button_enter',
								flex		: 1,
								border		: 0,
								height		: 50,
								margin		: '5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: 'close',
								flex		: 1,
								cls			: 'button_cancle',
								margin		: '5',
								border		: 0,
								height		: 50,
								listeners:{
									click:function(field){
										this.up('window').destroy();
									}
								}
							}
						]
					}
				],
			}
		;
		return form;
	},
	clickButton:function(value,field){
		var me		= this,
			form	= me.down('form'),
			result	= form.down('[name=result]'),
			once	= form.down('[name=result]').getValue(),
			request	= []
		;
		if(once == null){
			once ='0';
		}
		if(value == 'enter'){
			if(me.popup.params.dvcd == 1){
				var	h = once.substring(0,2),
					m = once.substring(2,4)
				;
				if(once.length == 4){
					if(once.indexOf('.') != -1){
						resource.showError('값을 확인해주세요.');
						return;
					}
					if(h>23){
						resource.showError('24시간을 초과할 수 없습니다. 값을 확인해주세요.');
						return;
					}else if(h==23 && m>59){
						resource.showError('24시간을 초과할 수 없습니다. 값을 확인해주세요.');
						return;
					}else if(m > 60){
						resource.showError('60분 미만만 입력가능합니다. 값을 확인해주세요.');
						return;
					}
				}else{
					resource.showError('값을 확인해주세요.');
					return;
				}
			}else{
				if(once<0){
					resource.showError('값을 확인해주세요.');
					return;
				}else{

					if(once.split('.').length>2){
						resource.showError('값을 확인해주세요.');
						return;
					}
				}
			}
			request.push({
				result : once
			});
			me.setResponse(request);
		}else if(value == 'button_clear'){
			result.setValue('');
		}else if(value == 'left'){
			var p = once+'';
			var s = p.length;
			result.setValue(p.substr(0,s-1));
		}else{
			result.setValue(once+(value+''));
		}
	}

});
