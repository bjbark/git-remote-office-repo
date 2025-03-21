Ext.define('lookup.popup.view.HantopKeypadPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-hntop-keypad-popup',
	alias	: 'widget.lookup-hntop-keypad-popup',

	title	: '계산공식 입력 키패드',
	closable: true,
	autoShow: true,
	width	: 1035,
	height	: 780,
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
						width		: 1080,
						height		: 60,
						fieldStyle	: 'font-size:2.5em !important; text-align : center;',
						value		: me.popup.param.result,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10',
						items	: [
							{	xtype		: 'button',
								name		: '+',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_plus',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '-',
								cls			: 'hntop_number_min',
								margin		: '5 0 0 5',
								border		: 0,
								width		: 70,
								height		: 50,
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: '*',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_mul',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '/',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_avg',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: 'if',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_if',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '(',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_par1',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: ')',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_par2',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: ',',
								width		: 70,
								height		: 50,
								cls			: 'hntop_number_spot',
								border		: 0,
								margin		: '5 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: 'CLR',
								width		: 80,
								height		: 50,
								cls			: 'hntop_number_clr',
								border		: 0,
								margin		: '5 0 0 15',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: 'DEL',
								width		: 80,
								height		: 50,
								cls			: 'hntop_number_del',
								border		: 0,
								margin		: '5 0 0 7',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: 'enter',
								cls			: 'hntop_number_enter',
								width		: 90,
								height		: 55,
								border		: 0,
								margin		: '5 0 0 15',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								}
							},{	xtype		: 'button',
								name		: 'close',
								cls			: 'hntop_number_cancel',
								width		: 90,
								height		: 55,
								border		: 0,
								margin		: '5 0 0 8',
								listeners:{
									click:function(field){
										this.up('window').destroy();
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 10',
						items	: [
							{	xtype		: 'button',
								name		: '1',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_1',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '2',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_2',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '3',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_3',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '4',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_4',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '5',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_5',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '6',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_6',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '7',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_7',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '8',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_8',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '9',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_9',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '0',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_0',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'button',
								name		: '.',
								width		: 85,
								height		: 70,
								cls			: 'hntop_number_point',
								border		: 0,
								margin		: '0 0 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '15 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'dcnt',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_dcnt',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: '이중창 여부(단창일 경우 1, 이중창일 경우 2)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'mwc',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_mwc',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: '메인창 갯수(창 형태에 따라 자동으로 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'bfw',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_bfw',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'BF 자재의 길이(주어진 제작 사이즈에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'bfh',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_bfh',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'BF 자재의 높이(주어진 제작 사이즈에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'bft',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_bft',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'BF 자재의 두께',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'sfw',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_sfw',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'SF 자재의 길이(주어진 제작 사이즈 및 창형태에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'sfh',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_sfh',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'SF 자재의 높이(주어진 제작 사이즈 및 창형태에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'sft',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_sft',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'SF 자재의 두께',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'mfw',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_mfw',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'MF 자재의 길이(주어진 제작 사이즈 및 창형태에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'mfh',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_mfh',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'MF 자재의 높이(주어진 제작 사이즈 및 창형태에 따라 자동 계산)',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'mccnt',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_mccnt',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: 'MC 자재의 소요수량',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 10 0 10',
						items	: [
							{	xtype		: 'button',
								name		: 'gfix',
								width		: 90,
								height		: 40,
								cls			: 'hntop_number_gfix',
								border		: 0,
								margin		: '2 5 0 5',
								listeners:{
									click:function(field){
										me.clickButton(field.name,field);
									}
								},
							},{	xtype		: 'label',
								text		: '유리고정턱 높이',
								height		: 30,
								style		: 'text-align:left; font-size : 1.6em !important;',
								margin		: '8 0 0 0'
							}
						]
					},
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
			request	= [], num, val
		;
		if(once == null){
			once ='0';
		}

		if(value == 'enter'){
			if(once == 0){
				resource.showError('값을 확인해주세요.');
				return;
			}

			var val = once.replace(/[a-z]/g,'1').replace(/\s/gi,'');
			try{
				num = ( new Function( 'return ' + val ))();
			}catch(err){
				resource.showError('값을 확인해주세요.');
				return;
			}

			request.push({
				result : once
			});
			me.setResponse(request);
		}

		if(value == 'CLR'){
			result.setValue('');
		}else if(value == 'DEL'){
			if(result.getValue().length <= 0){
				return;
			}else{
				var ar = result.getValue().split(" "),
					str = ""
				;
				for (var i = 0; i < ar.length-1; i++) {
					if(i == 0){
						str += ar[i];
					}else{
						str += " " + ar[i];
					}
				}
				result.setValue(str);
			}
		}else{
			if(result.getValue().length == 0){
				result.setValue(once+(value));
			}else{
				result.setValue(once+(' '+value));
			}
		}
	}

});
