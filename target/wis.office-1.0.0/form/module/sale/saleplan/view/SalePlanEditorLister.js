Ext.define('module.sale.saleplan.view.SalePlanEditorLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleplan-editor-lister',
	store		: 'module.sale.saleplan.store.SalePlan2',

	features	: [{ ftype : 'grid-summary'} ],
	border		: 0,
	columnLines : true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				pagingButton : false,
				items	: [
					'->', '-' ,
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style',
						listeners: {
	 			 			click:function(self,e){
								me.updateAction({});
							}
						}
					},
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }
				]
			};
		return item ;
	},
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'goalname'	, text : Language.get(''				,'월'		) , width : 40  , align : 'center'
					},{ dataIndex: 'goal'		, text : Language.get(''				,'목표'		) , width : 80 , xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row+1, grid.columns[1]);
									}
								}
							}
						}
					},{ dataIndex: 'rslt'		, text : Language.get(''				,'실적'		) , width : 80 , xtype : 'numericcolumn' , summaryType: 'sum' , format: '#,##0'
					},{ dataIndex: 'percent'	, text : Language.get(''				,'달성율'		) , width  : 60 , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {

		var me = this;
		var goal	= Number(this.getSelectionModel().getSelection()[0].data.goal);		//목표
		var rslt	= Number(this.getSelectionModel().getSelection()[0].data.rslt);		//실적
		var amnt	= Math.round(Number(rslt/goal*100)*100)/100;						//달성률
		var pos		= this.view.getSelectionModel().getCurrentPosition().row;
		var models	= me.getStore().getRange();

		if(goal==0 && rslt ==0){
			models[pos].set('percent',0);
			return;
		}else if(goal == 0){
			amnt = Math.round(Number(rslt/1*100)*100)/100;
		}else {
			models[pos].set('percent',amnt);
		}

	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},

	updateAction : function (config) {
		var me = this,
			store	= Ext.ComponentQuery.query('module-saleplan-editor-lister')[0].getStore(),
			editorlister =  me,
			lister	= Ext.ComponentQuery.query('module-saleplan-lister')[0],
			select	= lister.getSelectionModel().getSelection()[0],
			search	= Ext.ComponentQuery.query('module-saleplan-search')[0],
			param	= search.getValues(),
			chart	= Ext.getStore('module.sale.saleplan.store.SalePlanChart'),
			editor	= Ext.ComponentQuery.query('module-saleplan-editor')[0]
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

		mask.show();
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/saleplan/set/record.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					plan_year		: param.plan_year,
					sale_plan_dvcd	: param.sale_plan_dvcd,
					cstm_idcd		: select.get('cstm_idcd'),
					cstm_name		: select.get('cstm_name'),
					drtr_idcd		: select.get('drtr_idcd'),
					drtr_name		: select.get('drtr_name'),
					mn01_goal		: store.data.items[0].data.goal,
					mn02_goal		: store.data.items[1].data.goal,
					mn03_goal		: store.data.items[2].data.goal,
					mn04_goal		: store.data.items[3].data.goal,
					mn05_goal		: store.data.items[4].data.goal,
					mn06_goal		: store.data.items[5].data.goal,
					mn07_goal		: store.data.items[6].data.goal,
					mn08_goal		: store.data.items[7].data.goal,
					mn09_goal		: store.data.items[8].data.goal,
					mn10_goal		: store.data.items[9].data.goal,
					mn11_goal		: store.data.items[10].data.goal,
					mn12_goal		: store.data.items[11].data.goal,
					user_memo		: editor.down('[name=user_memo]').getValue(),
					line_levl		: store.data.items[0].data.line_levl,
					line_stat		: store.data.items[0].data.line_stat,
					updt_idcd		: _global.login_id,
					crte_idcd		: _global.login_id
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				console.log(request);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					lister.getStore().reload();
					editorlister.getStore().reload();
					chart.reload();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){
			}
		});
		mask.hide();
	}



});
