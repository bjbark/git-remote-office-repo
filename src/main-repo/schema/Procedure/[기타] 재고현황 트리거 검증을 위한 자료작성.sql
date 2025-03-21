	   
insert into isos_book (bzpl_idcd, invc_dvcd, invc_numb, line_seqn , invc_date, wrhs_idcd , acct_bacd, item_idcd, item_code, qntt, stok_qntt)
values ('1','1200','1','1','29100715','w2','1','1234567','7654321',150,150)
;	   

insert into isos_book (bzpl_idcd, invc_dvcd, invc_numb, line_seqn , invc_date, wrhs_idcd , acct_bacd, item_idcd, item_code, qntt, stok_qntt)
values ('1','2200','1','1','29100715','w2','1','1234567','7654321',150,-150)
;	   
insert into isos_book (bzpl_idcd, invc_dvcd, invc_numb, line_seqn , invc_date, wrhs_idcd , acct_bacd, item_idcd, item_code, qntt, stok_qntt)
values ('1','1300','1','1','29100715','w2','1','1234567','7654321',150,150)
;	   

insert into isos_book (bzpl_idcd, invc_dvcd, invc_numb, line_seqn , invc_date, wrhs_idcd , acct_bacd, item_idcd, item_code, qntt, stok_qntt)
values ('1','2100','1','1','29100715','w2','1','1234567','7654321',100, -100)
;	   




delete from isos_book where invc_dvcd = '2200'

update isos_book set qntt = 600, stok_qntt = 600
where invc_dvcd = '1300'


delete from isos_book;
delete from stok_mast;



select * from stok_mast

select * from isos_book;



