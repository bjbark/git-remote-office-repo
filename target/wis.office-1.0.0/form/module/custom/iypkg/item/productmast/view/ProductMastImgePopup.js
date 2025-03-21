Ext.define('module.custom.iypkg.item.productmast.view.ProductMastImgePopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-productmast-imge-popup',

	title		: '이미지 크게보기',
	closable	: true,
	autoShow	: true,
	width		: 1200 ,
	height		: 800,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		var store = Ext.create('Ext.data.Store', {
	        fields: ['title', 'imgSrc'],
	        data: []
	    });
		data = [];
		Ext.Ajax.request({
			url		: _global.location.http() + '/upload/get/imagesearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					invc_numb	: me.params.prod_idcd?me.params.prod_idcd:'',
					orgn_dvcd	: 'product_mast',
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
					if(result.records.length > 0){
						var record = result.records,
							Img_format = "\\.(bmp|gif|jpg|jpeg|png)$"
						;
						for (var i = 0; i < record.length; i++) {
							var url = result.records[i].file_path;
							if(new RegExp(Img_format).test(url)){
								data.push({imgSrc:_global.img_http+url})
							}
						}
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		store.loadData(data, false);
		me.items = [ me.createForm(store)];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function(store) {
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

						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style', width: 80 , height	: 35,	} ,
					]
				}
			],
			items : [me.editorForm(store) ]
		};
		return form;
	},

	editorForm : function (store) {
		var me	= this,
		item = {
				xtype 	: 'panel',
				layout	: 'vbox',
				border	: 0,
				items	: [
					{	xtype	: 'panel',
						width	: '100%',
						height	: '100%',
						border	: 0,
						items	: [
							{	xtype	: 'carousel',
								name	: 'apnd_imge',
								store	: store,
								width	: 1145,
								height	: 700,
								enlarge	: false,	//확대여부
								margin	: '10 5 0 20',
							}
						]
					}
				]
			};
		return item;
	},

});
