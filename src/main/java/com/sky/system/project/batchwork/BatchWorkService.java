package com.sky.system.project.batchwork;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class BatchWorkService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setImages(HttpRequestArgument arg) throws Exception {
		// logic
		DataMessage data = arg.newStorage("POS");

			String folder = "C:/Users/ws/Desktop/dooinImg/1";
			File file = new File(folder);
//			Image image;
			if(!file.isDirectory()){
				System.out.println("없음");
			}else{
				File[] list = file.listFiles();
				ByteArrayOutputStream baos = null;
				FileInputStream fis = null;
				byte[] returnValue = null;
				for(File f : list){
					int index = f.getName().indexOf(".");
					baos = new ByteArrayOutputStream();
					String names = f.getName();
					if(index>0){
						names = f.getName().substring(0,index);
					}
					System.out.println(names);
//					image = ImageIO.read(f);
//
//					Image resizeImage = image.getScaledInstance(400, 533, Image.SCALE_DEFAULT);
//
//					BufferedImage newImage = new BufferedImage(400, 533, BufferedImage.TYPE_INT_RGB);
//
//					Graphics g = newImage.getGraphics();
//					g.drawImage(resizeImage, 0, 0, null);
//					g.dispose();

//					ImageIO.write(newImage, "jpg", baos);

					fis = new FileInputStream(f);
					try {
						byte[] buf = new byte[(int) f.length()];
						int read = 0;
						while((read = fis.read(buf, 0, buf.length))!=-1){
							baos.write(buf,0,read);
						}
						returnValue = baos.toByteArray();

					} catch (Exception e) {
						e.printStackTrace();
					}finally{
						try {
							if(baos!=null){
								baos.close();
							}
							if(fis != null){
								fis.close();
							}
						} catch (Exception e2) {
						}
					}
					data.param
						.table("item_mast")

						.where("where item_idcd = :item_idcd")

						.unique("item_idcd"				, names)

						.update("item_imge"			, returnValue)
					;data.attach(Action.update);
					data.execute();
					data.clear();
				}
				System.out.println(list.length);
			}
		return null;
	}
}
