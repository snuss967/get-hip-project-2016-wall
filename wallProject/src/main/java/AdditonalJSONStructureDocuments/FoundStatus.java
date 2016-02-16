package AdditonalJSONStrucutreDocuments;

import javax.xml.bind.annotation.XmlElement;

public class FoundStatus {
//holds the information on whether we found our object or not
//has two fields a boolean whether it was found or not and a string that will
//be the new URI to which we are redirected
//the XML here will be converted to JSON since we use Application Produces JSON Annotation
public FoundStatus(boolean Found, String Path)
{
	this.Found = Found;
	this.Path = Path;
}
@XmlElement(required = true)
private boolean Found;
@XmlElement(required = true)
private String Path;
}
