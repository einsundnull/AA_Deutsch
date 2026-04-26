package main;
import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Arrays;

import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextArea;
import javax.swing.JTree;
import javax.swing.SwingUtilities;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeCellRenderer;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreeModel;
import javax.swing.tree.TreePath;

public class DeutschMaterialFileBrowser extends JFrame {

    private static final String BASE_PATH =
            "C:\\Users\\pc\\Desktop\\Standard Files\\AA Deutsch\\";

    private static final String LIBRE_OFFICE_WRITER =
            "C:\\Program Files\\LibreOffice\\program\\swriter.exe";

    private JTree tree;
    private JTextArea textArea;

    public DeutschMaterialFileBrowser() {
        setTitle("Deutsch Material Filebrowser");
        setSize(1000, 650);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        textArea = new JTextArea();
        textArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 15));

        tree = new JTree(buildTreeModel());
        tree.setCellRenderer(new FileTreeCellRenderer());
        tree.setRootVisible(false);
        tree.setShowsRootHandles(true);

        JScrollPane treeScroll = new JScrollPane(tree);
        JScrollPane textScroll = new JScrollPane(textArea);

        JSplitPane splitPane = new JSplitPane(
                JSplitPane.HORIZONTAL_SPLIT,
                treeScroll,
                textScroll
        );
        splitPane.setDividerLocation(350);

        add(splitPane, BorderLayout.CENTER);

        tree.addTreeSelectionListener(e -> {
            File file = getSelectedFile();
            if (file != null && file.isFile() && file.getName().toLowerCase().endsWith(".txt")) {
                showTextFile(file);
            }
        });

        tree.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getClickCount() == 2) {
                    File file = getSelectedFile();
                    if (file != null && file.isFile()) {
                        openWithLibreOffice(file);
                    }
                }
            }
        });
    }

    private TreeModel buildTreeModel() {
        DefaultMutableTreeNode root = new DefaultMutableTreeNode("AA Deutsch");

        File base = new File(BASE_PATH);
        File[] levelFolders = base.listFiles(file ->
                file.isDirectory() &&
                (
                        file.getName().startsWith("A1") ||
                        file.getName().startsWith("A2") ||
                        file.getName().startsWith("B1") ||
                        file.getName().startsWith("B2")
                )
        );

        if (levelFolders != null) {
            Arrays.sort(levelFolders);
            for (File folder : levelFolders) {
                root.add(createNode(folder));
            }
        }

        return new DefaultTreeModel(root);
    }

    private DefaultMutableTreeNode createNode(File file) {
        DefaultMutableTreeNode node = new DefaultMutableTreeNode(file);

        if (file.isDirectory()) {
            File[] children = file.listFiles(child ->
                    child.isDirectory() ||
                    child.getName().toLowerCase().endsWith(".txt") ||
                    child.getName().toLowerCase().endsWith(".odt") ||
                    child.getName().toLowerCase().endsWith(".docx")
            );

            if (children != null) {
                Arrays.sort(children, (a, b) -> {
                    if (a.isDirectory() && b.isFile()) return -1;
                    if (a.isFile() && b.isDirectory()) return 1;
                    return a.getName().compareToIgnoreCase(b.getName());
                });

                for (File child : children) {
                    node.add(createNode(child));
                }
            }
        }

        return node;
    }

    private File getSelectedFile() {
        TreePath path = tree.getSelectionPath();
        if (path == null) return null;

        DefaultMutableTreeNode node =
                (DefaultMutableTreeNode) path.getLastPathComponent();

        Object obj = node.getUserObject();

        if (obj instanceof File) {
            return (File) obj;
        }

        return null;
    }

    private void showTextFile(File file) {
        try {
            String content = Files.readString(file.toPath(), StandardCharsets.UTF_8);
            textArea.setText(content);
            textArea.setCaretPosition(0);
        } catch (IOException e) {
            textArea.setText("Fehler beim Lesen der Datei:\n" + file.getAbsolutePath());
        }
    }

    private void openWithLibreOffice(File file) {
        try {
            File libreOffice = new File(LIBRE_OFFICE_WRITER);

            if (libreOffice.exists()) {
                new ProcessBuilder(
                        libreOffice.getAbsolutePath(),
                        file.getAbsolutePath()
                ).start();
            } else {
                Desktop.getDesktop().open(file);
            }

        } catch (IOException e) {
            JOptionPane.showMessageDialog(
                    this,
                    "Datei konnte nicht geöffnet werden:\n" + file.getAbsolutePath()
            );
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new DeutschMaterialFileBrowser().setVisible(true)
        );
    }
    
    private static class FileTreeCellRenderer extends DefaultTreeCellRenderer {

        @Override
        public Component getTreeCellRendererComponent(
                JTree tree,
                Object value,
                boolean selected,
                boolean expanded,
                boolean leaf,
                int row,
                boolean hasFocus
        ) {
            super.getTreeCellRendererComponent(
                    tree, value, selected, expanded, leaf, row, hasFocus
            );

            DefaultMutableTreeNode node = (DefaultMutableTreeNode) value;
            Object obj = node.getUserObject();

            if (obj instanceof File) {
                File file = (File) obj;
                setText(file.getName());
            }

            return this;
        }
    }
}